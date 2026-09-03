import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildCsp, inlineScriptHashes, securityHeaders } from './securityHeaders.js'

function fakeRes() {
  const headers = {}
  return { headers, setHeader: (k, v) => { headers[k] = v }, next: 0 }
}

test('inlineScriptHashes hashes only the script with no src, ignoring bundle tags', () => {
  const body = "\n  (function(){ console.log('theme'); })();\n"
  const html = `<html><head><script>${body}</script></head><body><script type="module" src="/src/main.tsx"></script></body></html>`
  const hashes = inlineScriptHashes(html)
  assert.equal(hashes.length, 1)
  const expected = `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`
  assert.equal(hashes[0], expected)
})

test('inlineScriptHashes finds nothing when every script tag has a src', () => {
  assert.deepEqual(inlineScriptHashes('<script src="/x.js"></script>'), [])
})

test('buildCsp allow-lists the given script hashes alongside the fixed policy', () => {
  const csp = buildCsp(["'sha256-abc123'"])
  assert.match(csp, /script-src 'self' https:\/\/challenges\.cloudflare\.com [^;]*'sha256-abc123'/)
  assert.match(csp, /frame-ancestors 'none'/)
  assert.match(csp, /object-src 'none'/)
})

test('securityHeaders sets every required header, report-only by default', () => {
  const middleware = securityHeaders({ enforce: false })
  const res = fakeRes()
  middleware({}, res, () => { res.next += 1 })
  assert.equal(res.headers['Strict-Transport-Security'], 'max-age=31536000; includeSubDomains; preload')
  assert.equal(res.headers['X-Frame-Options'], 'DENY')
  assert.equal(res.headers['X-Content-Type-Options'], 'nosniff')
  assert.equal(res.headers['Referrer-Policy'], 'strict-origin-when-cross-origin')
  assert.equal(res.headers['Permissions-Policy'], 'camera=(), microphone=(self), geolocation=(), payment=()')
  assert.equal(res.headers['Cross-Origin-Opener-Policy'], 'same-origin')
  assert.ok(res.headers['Content-Security-Policy-Report-Only'])
  assert.equal(res.headers['Content-Security-Policy'], undefined)
  assert.equal(res.next, 1)
})

test('securityHeaders enforces CSP instead of report-only when asked', () => {
  const res = fakeRes()
  securityHeaders({ enforce: true })({}, res, () => {})
  assert.ok(res.headers['Content-Security-Policy'])
  assert.equal(res.headers['Content-Security-Policy-Report-Only'], undefined)
})

test('securityHeaders picks up the built index.html theme script by hash', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'sec-headers-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  const body = "\n  document.documentElement.dataset.theme = 'light';\n"
  writeFileSync(join(dir, 'index.html'), `<script>${body}</script>`)
  const res = fakeRes()
  securityHeaders({ publicDir: dir, enforce: false })({}, res, () => {})
  const expected = `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`
  assert.match(res.headers['Content-Security-Policy-Report-Only'], new RegExp(expected.replace(/[+/]/g, '\\$&')))
})

test('securityHeaders tolerates a missing built index.html (dev/test)', () => {
  const res = fakeRes()
  assert.doesNotThrow(() => securityHeaders({ publicDir: '/no/such/dir', enforce: false })({}, res, () => {}))
})
