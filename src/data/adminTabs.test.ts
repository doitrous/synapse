import test from 'node:test'
import assert from 'node:assert/strict'
import { ADMIN_TAB_VIEWS, DEFAULT_ROLE_TABS, TAB_IDS, tabViewsFor, tabsForRole } from './adminTabs.ts'
import * as server from '../../server/src/tabs.js'

test('every registered tab has a label, a route and an icon', () => {
  assert.deepEqual(ADMIN_TAB_VIEWS.map((view) => view.id), TAB_IDS)
  for (const view of ADMIN_TAB_VIEWS) {
    assert.ok(view.label, `${view.id} has no label`)
    assert.ok(view.to.startsWith('/admin'), `${view.id} route: ${view.to}`)
    assert.ok(view.icon, `${view.id} has no icon`)
  }
})

test('no two tabs share a label, so the sidebar is never ambiguous', () => {
  const labels = ADMIN_TAB_VIEWS.map((view) => view.label)
  assert.equal(new Set(labels).size, labels.length)
})

test('the client registry is the server registry, tab for tab', () => {
  assert.deepEqual(TAB_IDS, server.TAB_IDS)
  const serverById = new Map((server.ADMIN_TABS as Array<Record<string, unknown>>).map((tab) => [tab.id as string, tab]))
  for (const view of ADMIN_TAB_VIEWS) {
    const tab = serverById.get(view.id)!
    assert.equal(view.to, tab.to, `${view.id} route`)
    assert.equal(view.group, tab.group, `${view.id} group`)
    assert.equal(Boolean(view.superAdminOnly), Boolean(tab.superAdminOnly), `${view.id} governance`)
    assert.deepEqual(view.stateKeys, tab.stateKeys, `${view.id} state keys`)
    assert.deepEqual(view.apiPrefixes, tab.apiPrefixes, `${view.id} api prefixes`)
  }
})

test('the client and the server hand every role the same tabs', () => {
  const configs = [null, {}, { reviewer: ['questions'] }, { editor: ['settings', 'questions'] }, { admin: [] }]
  for (const role of ['student', 'reviewer', 'admin', 'editor', 'super_admin']) {
    for (const config of configs) {
      assert.deepEqual(tabsForRole(role, config), server.tabsForRole(role, config), `${role} with ${JSON.stringify(config)}`)
    }
  }
  assert.deepEqual(DEFAULT_ROLE_TABS, server.DEFAULT_ROLE_TABS)
})

test('a role renders exactly the tabs it holds, in registry order', () => {
  const reviewer = tabViewsFor('reviewer', null).map((view) => view.id)
  assert.deepEqual(reviewer, ['library', 'questions', 'practical', 'flashcards', 'written', 'histology', 'concepts', 'resources', 'media'])
  assert.deepEqual(tabViewsFor('student', null), [])
  assert.equal(tabViewsFor('super_admin', null).length, TAB_IDS.length)
})
