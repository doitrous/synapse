/**
 * Every admin surface, what it governs, and who holds it by default.
 *
 * The sidebar, the router and the server guards used to be three independent
 * lists, which is three answers to one question. This is the single list they
 * all derive from: the client mirrors it in `src/data/adminTabs.ts` with the
 * labels and icons a browser needs, and a parity test asserts the two agree on
 * every id, route and resolution.
 *
 * `stateKeys` is what makes hiding a tab mean something. A tab you cannot see
 * is a tab whose documents you cannot write, so removing it removes the
 * capability rather than only the link.
 */

import { rank } from './roles.js'

export const ROLE_TABS_STATE_KEY = 'synapse-role-tabs-v1'

export const ADMIN_TABS = [
  { id: 'dashboard', to: '/admin', group: 'Overview', stateKeys: [], apiPrefixes: ['/api/admin/platform'] },

  { id: 'taxonomy', to: '/admin/taxonomy', group: 'Content',
    stateKeys: ['synapse-taxonomy-tree-v4', 'synapse-medical-library-taxonomy-v1'], apiPrefixes: [] },
  { id: 'glossary', to: '/admin/glossary', group: 'Content',
    stateKeys: ['synapse-medical-glossary-v1'], apiPrefixes: [] },
  { id: 'academic', to: '/admin/academic', group: 'Content',
    stateKeys: ['synapse-academic-universities-v1', 'synapse-course-curricula-v1', 'synapse-module-schedules-v1'],
    apiPrefixes: [] },
  { id: 'marks', to: '/admin/academic/marks', group: 'Content',
    stateKeys: ['synapse-module-subjects-v1'], apiPrefixes: [] },
  { id: 'library', to: '/admin/library', group: 'Content',
    stateKeys: [
      'synapse-admin-content-ledger-v4',
      'synapse-medical-evidence-v1',
      'synapse-medical-evidence-published-v1',
      'synapse-import-journal-v1',
      'synapse-library-trees-v1',
    ],
    apiPrefixes: ['/api/medical-library/coverage'] },
  { id: 'questions', to: '/admin/questions', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'adaptive', to: '/admin/adaptive', group: 'Content',
    stateKeys: ['synapse-adaptive-config-v1', 'synapse-adaptive-blueprints-v1', 'synapse-adaptive-heldout-v1'],
    apiPrefixes: [] },
  { id: 'practical', to: '/admin/practical', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-minigame-packs-v1', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'flashcards', to: '/admin/flashcards', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'written', to: '/admin/written', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'histology', to: '/admin/histology', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'concepts', to: '/admin/concepts', group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'relationships', to: '/admin/relationships', group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-relation-types-v1', 'synapse-import-journal-v1'],
    apiPrefixes: [] },
  { id: 'resources', to: '/admin/resources', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-media-library-v1'],
    apiPrefixes: ['/api/medical-resources', '/api/media'] },
  { id: 'media', to: '/admin/library/media', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-media-library-v1'], apiPrefixes: ['/api/media'] },
  { id: 'reports', to: '/admin/reports', group: 'Content',
    stateKeys: ['synapse-content-reports-v1'], apiPrefixes: [] },

  { id: 'email', to: '/admin/email', group: 'Operations',
    stateKeys: ['synapse-email-automations-v1'], apiPrefixes: [] },
  { id: 'mailbox', to: '/admin/mailbox', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/mail', '/api/mailboxes'] },
  { id: 'notifications', to: '/admin/notifications', group: 'Operations',
    stateKeys: ['synapse-notification-campaigns-v1'], apiPrefixes: [] },
  { id: 'users', to: '/admin/users', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/users', '/api/admin/enrollment-change-requests'] },
  { id: 'students', to: '/admin/students', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/students'] },
  { id: 'payments', to: '/admin/payments', group: 'Operations',
    stateKeys: ['synapse-plans-v1', 'synapse-plan-catalog-v1', 'synapse-student-id-discount-v1'],
    apiPrefixes: ['/api/admin/pricing'] },
  { id: 'vouchers', to: '/admin/vouchers', group: 'Operations',
    stateKeys: ['synapse-vouchers-v1'], apiPrefixes: [] },
  { id: 'assistant', to: '/admin/assistant', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/assistant'] },
  { id: 'privacy', to: '/admin/privacy', group: 'Operations', stateKeys: [], apiPrefixes: [] },

  { id: 'settings', to: '/admin/settings', group: 'Governance', superAdminOnly: true,
    stateKeys: ['synapse-storage-limits-v1', 'synapse-system-colors-v1'], apiPrefixes: [] },
  { id: 'audit', to: '/admin/audit', group: 'Governance', superAdminOnly: true,
    stateKeys: [], apiPrefixes: ['/api/backups', '/api/launch'] },
  { id: 'access', to: '/admin/access', group: 'Governance', superAdminOnly: true,
    stateKeys: [ROLE_TABS_STATE_KEY], apiPrefixes: [] },
]

export const TAB_IDS = ADMIN_TABS.map((tab) => tab.id)

const SUPER_ADMIN_ONLY = new Set(ADMIN_TABS.filter((tab) => tab.superAdminOnly).map((tab) => tab.id))

export const DEFAULT_ROLE_TABS = {
  editor: TAB_IDS.filter((id) => !SUPER_ADMIN_ONLY.has(id)),
  admin: [
    'dashboard', 'reports', 'email', 'mailbox', 'notifications',
    'users', 'students', 'payments', 'vouchers', 'assistant', 'privacy',
  ],
  reviewer: ['library', 'questions', 'practical', 'flashcards', 'written', 'histology', 'concepts', 'resources', 'media'],
}

/**
 * The tabs this role holds.
 *
 * A super admin's set is computed, never read from configuration — that is the
 * property that makes locking yourself out impossible. Everyone else takes the
 * stored list when there is one, and the default when there is not. A
 * super-admin-only tab is filtered out last, so no configuration can hand one
 * over.
 */
export function tabsForRole(role, storedConfig) {
  if (role === 'super_admin') return TAB_IDS
  if (rank(role) < 1) return []
  const stored = storedConfig && typeof storedConfig === 'object' ? storedConfig[role] : null
  const wanted = new Set(Array.isArray(stored) ? stored : DEFAULT_ROLE_TABS[role] ?? [])
  return TAB_IDS.filter((id) => wanted.has(id) && !SUPER_ADMIN_ONLY.has(id))
}

/** Which tabs may write this document. Empty means none — super admin only. */
export function tabsForStateKey(key) {
  return ADMIN_TABS.filter((tab) => tab.stateKeys.includes(key)).map((tab) => tab.id)
}

/** True when the caller holds at least one of the tabs that would permit this. */
export function holdsTab(heldTabs, wantedTabs) {
  if (!wantedTabs?.length) return false
  const held = new Set(heldTabs)
  return wantedTabs.some((id) => held.has(id))
}
