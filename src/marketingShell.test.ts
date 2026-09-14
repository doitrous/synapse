import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

/**
 * SEO Phase 0 hygiene smoke test: the marketing entry documents (index.html, en/index.html,
 * ar/index.html) are static source files, not build output, so this reads them directly rather
 * than spinning up the Vite/Express stack. Each must have a real <h1>, a self-canonical link,
 * ≥200 words of raw text (no JS required), and JSON-LD that actually parses — the exact gaps the
 * live probe found (9-word shell, no <h1>, no entity JSON-LD).
 */
const ROOT = fileURLToPath(new URL('../', import.meta.url))

function wordCount(html: string): number {
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
  return text.split(/\s+/).filter(Boolean).length
}

function jsonLdBlocks(html: string): unknown[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
}

for (const [label, file, canonical] of [
  ['home (/)', 'index.html', 'https://nishany.com/'],
  ['/en', 'en/index.html', 'https://nishany.com/en'],
  ['/ar', 'ar/index.html', 'https://nishany.com/ar'],
] as const) {
  test(`${label} raw HTML has an <h1>, a self-canonical, ≥200 words, and parseable entity JSON-LD`, () => {
    const html = readFileSync(`${ROOT}${file}`, 'utf8')
    assert.match(html, /<h1[ >]/)
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), 'canonical should self-reference this page')
    assert.ok(wordCount(html) >= 200, `expected ≥200 words, got ${wordCount(html)}`)
    const blocks = jsonLdBlocks(html)
    assert.ok(blocks.some((b: any) => b['@type'] === 'EducationalOrganization'), 'missing EducationalOrganization JSON-LD')
    assert.ok(blocks.some((b: any) => b['@type'] === 'WebSite'), 'missing WebSite JSON-LD')
  })
}
