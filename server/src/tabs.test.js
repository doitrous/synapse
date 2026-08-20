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

test('admin is operations and reviewer is content, and they barely overlap', () => {
  const admin = new Set(tabsForRole('admin', null))
  const reviewer = new Set(tabsForRole('reviewer', null))
  assert.equal(admin.has('users'), true)
  assert.equal(admin.has('questions'), false)
  assert.equal(reviewer.has('questions'), true)
  assert.equal(reviewer.has('media'), true)
  assert.equal(reviewer.has('users'), false)
  assert.equal(reviewer.has('dashboard'), false)
  // Systems & Topics is editor-and-above this phase: its nodes carry no module
  // or year, so a reviewer's scope could not be enforced on it.
  assert.equal(reviewer.has('taxonomy'), false)
  assert.deepEqual([...admin].filter((id) => reviewer.has(id)), [])
})

test('a student holds nothing', () => {
  assert.deepEqual(tabsForRole('student', null), [])
  assert.deepEqual(tabsForRole('nonsense', null), [])
})

test('a stored configuration replaces a role default, and junk in it is ignored', () => {
  assert.deepEqual(tabsForRole('reviewer', { reviewer: ['questions', 'nope'] }), ['questions'])
  assert.deepEqual(tabsForRole('reviewer', { reviewer: [] }), [])
  // A super-admin-only tab cannot be handed out by configuration.
  assert.deepEqual(tabsForRole('editor', { editor: ['settings', 'questions'] }), ['questions'])
  // A role the document does not mention keeps its default.
  assert.deepEqual(tabsForRole('admin', { reviewer: [] }), tabsForRole('admin', null))
  assert.deepEqual(tabsForRole('admin', 'nonsense'), tabsForRole('admin', null))
})

test('the tabs are returned in registry order, so the first one is predictable', () => {
  const held = tabsForRole('reviewer', null)
  assert.deepEqual(held, TAB_IDS.filter((id) => held.includes(id)))
  assert.equal(held[0], 'library')
})

test('a state key resolves to the tabs that may write it', () => {
  assert.deepEqual(tabsForStateKey('synapse-vouchers-v1'), ['vouchers'])
  assert.deepEqual(
    tabsForStateKey('synapse-admin-content-ledger-v4'),
    ['library', 'questions', 'practical', 'resources', 'media'],
  )
  assert.deepEqual(tabsForStateKey(ROLE_TABS_STATE_KEY), ['access'])
})

test('an unregistered key belongs to no tab, so only a super admin may write it', () => {
  assert.deepEqual(tabsForStateKey('synapse-something-nobody-declared'), [])
  assert.equal(holdsTab(tabsForRole('editor', null), []), false)
  assert.equal(holdsTab(tabsForRole('editor', null), ['questions']), true)
  assert.equal(holdsTab(tabsForRole('admin', null), ['questions']), false)
  assert.equal(holdsTab(tabsForRole('admin', null), ['questions', 'users']), true)
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
