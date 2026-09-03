import test from 'node:test'
import assert from 'node:assert/strict'
import { isAdminHost, isStudentHost, portalHome } from './portalHost.ts'

/** The hostname is read at call time, so a test can simply move the window. */
function at(hostname: string) {
  ;(globalThis as { window?: unknown }).window = { location: { hostname, pathname: '/', search: '', hash: '' } }
}

test('the two production hosts are told apart, and the admin subdomain is not a student host', () => {
  at('connectadminacademy.nishany.com')
  assert.equal(isAdminHost(), true)
  // The whole split rests on this: the admin host is a subdomain of nishany.com,
  // so an unanchored student pattern would match it too and the admin domain would
  // hand itself away. The leading-label anchor is what keeps them apart.
  assert.equal(isStudentHost(), false)

  at('nishany.com')
  assert.equal(isAdminHost(), false)
  assert.equal(isStudentHost(), true)

  // The pre-rebrand domain still serves students (mobile API host, old links).
  at('synapse.doitrous.com')
  assert.equal(isAdminHost(), false)
  assert.equal(isStudentHost(), true)

  at('www.nishany.com')
  assert.equal(isStudentHost(), true)
})

test('home is a path this origin actually serves', () => {
  // `/app` on the admin domain is a hand-over to the student origin. A
  // fallback naming it — after sign-in, after MFA, on cancelling a sign-out —
  // ejects an admin from the domain they just asked for.
  at('connectadminacademy.nishany.com')
  assert.equal(portalHome(), '/admin')

  at('synapse.doitrous.com')
  assert.equal(portalHome(), '/app')
})

test('development hosts belong to neither portal, so every route stays mounted', () => {
  for (const hostname of ['localhost', '127.0.0.1', 'preview-3.example.dev']) {
    at(hostname)
    assert.equal(isAdminHost(), false, hostname)
    assert.equal(isStudentHost(), false, hostname)
    assert.equal(portalHome(), '/app', hostname)
  }
})
