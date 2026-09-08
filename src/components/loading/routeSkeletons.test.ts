import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { ADMIN_LOADING_LAYOUTS, PUBLIC_LOADING_LAYOUTS, STUDENT_LOADING_LAYOUTS, loadingLayoutFor } from './routeSkeletons.ts'

const router = readFileSync(new URL('../../router.tsx', import.meta.url), 'utf8')
function keysBetween(start: string, end: string) {
  const block = router.slice(router.indexOf(start), router.indexOf(end, router.indexOf(start)))
  return [...block.matchAll(/^  (?:'([^']+)'|(\w+)): /gm)].map(match => match[1] ?? match[2])
}
test('every mounted student page has an explicit loading contract', () => {
  const keys = keysBetween('const studentPages:', 'const studentBuilt:')
  assert.ok(keys.length > 30)
  for (const key of ['', ...keys]) assert.ok(key in STUDENT_LOADING_LAYOUTS, key)
})
test('every mounted admin page and nested editor has a loading contract', () => {
  const keys = keysBetween('const adminBuilt:', '// Keep mounted routes')
  assert.ok(keys.length > 25)
  for (const key of ['', ...keys]) assert.ok(key in ADMIN_LOADING_LAYOUTS, key)
  for (const match of router.matchAll(/guarded\('([^']+)'/g)) assert.notEqual(loadingLayoutFor(`/admin/${match[1]}`).shape, 'message', match[1])
})
test('public, authentication and legal routes are covered', () => {
  for (const match of router.matchAll(/\{ path: '(\/[^']*)', element:/g)) {
    const path = match[1]
    if (path.includes('*') || path === '/s/:id') continue
    assert.ok(path in PUBLIC_LOADING_LAYOUTS, path)
  }
})
test('aliases and detail links use their destination, including trailing slashes', () => {
  for (const [alias, destination] of Object.entries({ plan: 'calendar', learn: 'library', practice: 'qbank', revise: 'study-tools', 'study-together': 'study-rooms', billing: 'account', 'question-notes': 'notebook' })) {
    assert.deepEqual(loadingLayoutFor(`/app/${alias}/`), loadingLayoutFor(`/app/${destination}`))
  }
  assert.equal(loadingLayoutFor('/app/resources/document-1').shape, 'reader')
  assert.equal(loadingLayoutFor('/s/shared-document').shape, 'reader')
  assert.equal(loadingLayoutFor('/app/spotter', '?set=one').shape, 'game-round')
  assert.equal(loadingLayoutFor('/app/study-rooms', '?room=one').shape, 'room')
  assert.equal(loadingLayoutFor('/admin/import/question').shape, 'import')
  assert.equal(loadingLayoutFor('/app/does-not-exist').shape, 'message')
})
