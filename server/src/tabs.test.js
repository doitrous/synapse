import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ADMIN_TABS, DEFAULT_ROLE_TABS, ROLE_TABS_STATE_KEY, TAB_IDS,
  holdsTab, tabsForRole, tabsForStateKey,
} from './tabs.js'

test('every tab id is unique and every route is unique', () => {
  assert.equal(new Set(TAB_IDS).size, TAB_IDS.length)
  const routes = ADMIN_TABS.map((tab) => tab.to)
  assert.equal(new Set(routes).size, routes.length)
})

test('a super admin holds every tab, and nothing stored can take one away', () => {
  assert.deepEqual(tabsForRole('super_admin', null), TAB_IDS)
  assert.deepEqual(tabsForRole('super_admin', { super_admin: [] }), TAB_IDS)
  assert.deepEqual(tabsForRole('super_admin', { editor: [] }), TAB_IDS)
})

test('an editor holds everything except the super-admin-only tabs', () => {
  const held = tabsForRole('editor', null)
  const superOnly = ADMIN_TABS.filter((tab) => tab.superAdminOnly).map((tab) => tab.id)
  assert.deepEqual(superOnly, ['settings', 'audit', 'access'])
  for (const id of superOnly) assert.equal(held.includes(id), false)
  assert.equal(held.length, TAB_IDS.length - superOnly.length)
})

test('a reviewer holds exactly Media Requests and Content Reports', () => {
  const admin = new Set(tabsForRole('admin', null))
  const reviewer = tabsForRole('reviewer', null)
  assert.deepEqual(reviewer, ['media', 'reports'])
  // None of the surfaces that author or destroy content are a reviewer's. Each
  // used to be in the default; removing the tab removes the write capability,
  // not only the link.
  for (const id of ['library', 'questions', 'practical', 'flashcards', 'written',
    'histology', 'concepts', 'relationships', 'resources', 'taxonomy']) {
    assert.equal(reviewer.includes(id), false, `reviewer must not hold ${id}`)
  }
  // Nor operations.
  assert.equal(reviewer.includes('users'), false)
  assert.equal(reviewer.includes('dashboard'), false)
  // Admin keeps operations; Content Reports is the one surface both can open — a
  // reviewer to raise a problem, an admin to see the queue. What a reviewer may
  // actually do there is narrowed by role in authoriseChanges, not by the tab.
  assert.deepEqual(reviewer.filter((id) => admin.has(id)), ['reports'])
  assert.equal(admin.has('users'), true)
  assert.equal(admin.has('media'), false)
})

test('a student holds nothing', () => {
  assert.deepEqual(tabsForRole('student', null), [])
  assert.deepEqual(tabsForRole('mcq_validator', null), [])
  assert.deepEqual(tabsForRole('nonsense', null), [])
})

test('a stored configuration replaces a role default, and junk in it is ignored', () => {
  assert.deepEqual(tabsForRole('reviewer', { reviewer: ['content', 'nope'] }), ['content'])
  assert.deepEqual(tabsForRole('reviewer', { reviewer: [] }), [])
  assert.deepEqual(tabsForRole('reviewer', { reviewer: ['validation'] }), [])
  // A super-admin-only tab cannot be handed out by configuration.
  assert.deepEqual(tabsForRole('editor', { editor: ['settings', 'content'] }), ['content'])
  // A role the document does not mention keeps its default.
  assert.deepEqual(tabsForRole('admin', { reviewer: [] }), tabsForRole('admin', null))
  assert.deepEqual(tabsForRole('admin', 'nonsense'), tabsForRole('admin', null))
})

test('the tabs are returned in registry order, so the first one is predictable', () => {
  const held = tabsForRole('reviewer', null)
  assert.deepEqual(held, TAB_IDS.filter((id) => held.includes(id)))
  assert.equal(held[0], 'media')
})

test('a state key resolves to the tabs that may write it', () => {
  assert.deepEqual(tabsForStateKey('nishany-vouchers-v1'), ['vouchers'])
  // The seven per-kind content tabs collapsed into one Content tab, which now
  // owns the ledger alongside Media Requests.
  assert.deepEqual(
    tabsForStateKey('nishany-admin-content-ledger-v4'),
    ['content', 'media'],
  )
  assert.deepEqual(tabsForStateKey(ROLE_TABS_STATE_KEY), ['access'])
  assert.deepEqual(tabsForStateKey('nishany-media-library-v1'), ['content', 'media'])
  assert.deepEqual(tabsForStateKey('nishany-library-trees-v1'), ['content'])
})

test('an unregistered key belongs to no tab, so only a super admin may write it', () => {
  assert.deepEqual(tabsForStateKey('nishany-something-nobody-declared'), [])
  assert.equal(holdsTab(tabsForRole('editor', null), []), false)
  assert.equal(holdsTab(tabsForRole('editor', null), ['content']), true)
  assert.equal(holdsTab(tabsForRole('admin', null), ['content']), false)
  assert.equal(holdsTab(tabsForRole('admin', null), ['content', 'users']), true)
})

test('every declared state key and api prefix is claimed by exactly one owner list', () => {
  for (const tab of ADMIN_TABS) {
    for (const key of tab.stateKeys) assert.ok(tabsForStateKey(key).includes(tab.id), `${key} → ${tab.id}`)
    for (const prefix of tab.apiPrefixes) assert.ok(prefix.startsWith('/api/'), prefix)
  }
})

test('every role default names only tabs that exist', () => {
  for (const [role, ids] of Object.entries(DEFAULT_ROLE_TABS)) {
    for (const id of ids) assert.ok(TAB_IDS.includes(id), `${role} default names unknown tab ${id}`)
  }
})
