import test from 'node:test'
import assert from 'node:assert/strict'
import { isAdminHost, isStudentHost, portalHome } from './portalHost.ts'

/** The hostname is read at call time, so a test can simply move the window. */
function at(hostname: string) {
  ;(globalThis as { window?: unknown }).window = { location: { hostname, pathname: '/', search: '', hash: '' } }
}

test('the two production hosts are told apart, and "adminsynapse" is not "synapse"', () => {
  at('adminsynapse.doitrous.com')
  assert.equal(isAdminHost(), true)
  // The whole split rests on this: an unanchored student pattern would match
  // the admin host too, and the admin domain would hand itself away.
  assert.equal(isStudentHost(), false)

  at('synapse.doitrous.com')
  assert.equal(isAdminHost(), false)
  assert.equal(isStudentHost(), true)
})

test('home is a path this origin actually serves', () => {
  // `/app` on the admin domain is a hand-over to synapse.doitrous.com. A
  // fallback naming it — after sign-in, after MFA, on cancelling a sign-out —
  // ejects an admin from the domain they just asked for.
  at('adminsynapse.doitrous.com')
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
