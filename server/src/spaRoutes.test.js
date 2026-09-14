import assert from 'node:assert/strict'
import test from 'node:test'
import { isKnownSpaPath } from './spaRoutes.js'

test('known top-level and nested client routes pass', () => {
  for (const path of ['/', '/en', '/ar', '/pricing', '/app', '/app/revise', '/admin', '/admin/students', '/auth/mfa', '/s/abc123']) {
    assert.equal(isKnownSpaPath(path), true, path)
  }
})

test('an unknown path fails, including one that merely starts with a known prefix', () => {
  for (const path of ['/nonexistent', '/pricingx', '/wp-admin', '/.env']) {
    assert.equal(isKnownSpaPath(path), false, path)
  }
})
