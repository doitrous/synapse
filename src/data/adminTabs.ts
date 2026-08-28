/**
 * The client's twin of `server/src/tabs.js`, plus the presentation the browser
 * needs — a label and an icon per tab.
 *
 * Declared rather than imported. The server module is plain JavaScript outside
 * `src`, so importing it here would put an untyped file into the Vite bundle
 * and fail `tsc -b`. `adminTabs.test.ts` imports both and asserts they agree;
 * test files are excluded from `tsconfig.app.json` and run on Node, which is
 * where a cross-boundary import belongs. Same arrangement as `adminRoles.ts`.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Gauge, Network, Languages, GraduationCap, Scale, Library, FileQuestion, Compass,
  Stethoscope, Braces, GitFork, Clapperboard, ImagePlus, Flag, MonitorPlay, Mail, Inbox, BellRing,
  Layers, PenLine, Microscope, Siren,
  UserCog, Users, Banknote, TicketPercent, Bot, LifeBuoy, Settings, ShieldCheck, KeyRound,
} from 'lucide-react'
import { rank } from './adminRoles.ts'

export const ROLE_TABS_STATE_KEY = 'synapse-role-tabs-v1'

export type AdminTabGroup = 'Overview' | 'Content' | 'Operations' | 'Governance'

export interface AdminTabView {
  id: string
  label: string
  to: string
  icon: LucideIcon
  group: AdminTabGroup
  /** What this tab governs, shown on Access Control before somebody hides it. */
  stateKeys: string[]
  apiPrefixes: string[]
  superAdminOnly?: boolean
  end?: boolean
}

export const ADMIN_TAB_VIEWS: AdminTabView[] = [
  { id: 'dashboard', label: 'Control Dashboard', to: '/admin', icon: Gauge, group: 'Overview', end: true, stateKeys: [], apiPrefixes: ['/api/admin/platform'] },

  { id: 'taxonomy', label: 'Systems & Topics', to: '/admin/taxonomy', icon: Network, group: 'Content',
    stateKeys: ['synapse-taxonomy-tree-v4', 'synapse-medical-library-taxonomy-v1'], apiPrefixes: [] },
  { id: 'glossary', label: 'Glossary', to: '/admin/glossary', icon: Languages, group: 'Content',
    stateKeys: ['synapse-medical-glossary-v1'], apiPrefixes: [] },
  { id: 'academic', label: 'Academic Setup', to: '/admin/academic', icon: GraduationCap, group: 'Content',
    stateKeys: ['synapse-academic-universities-v1', 'synapse-course-curricula-v1', 'synapse-module-schedules-v1', 'synapse-module-subjects-v1', 'synapse-assessment-schemes-v1', 'synapse-academic-source-provenance-v1'], apiPrefixes: [] },
  { id: 'marks', label: 'Marks & Weights', to: '/admin/academic/marks', icon: Scale, group: 'Content',
    stateKeys: ['synapse-module-subjects-v1', 'synapse-assessment-schemes-v1'], apiPrefixes: [] },
  { id: 'library', label: 'Library Setup', to: '/admin/library', icon: Library, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-medical-evidence-v1', 'synapse-medical-evidence-published-v1', 'synapse-import-journal-v1', 'synapse-library-trees-v1'],
    apiPrefixes: ['/api/medical-library/coverage'] },
  { id: 'questions', label: 'Questions Setup', to: '/admin/questions', icon: FileQuestion, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'adaptive', label: 'Adaptive Learning', to: '/admin/adaptive', icon: Compass, group: 'Content',
    stateKeys: ['synapse-adaptive-config-v1', 'synapse-adaptive-blueprints-v1', 'synapse-adaptive-heldout-v1'], apiPrefixes: [] },
  { id: 'practical', label: 'Practical Setup', to: '/admin/practical', icon: Stethoscope, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-minigame-packs-v1', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'flashcards', label: 'Flashcards Setup', to: '/admin/flashcards', icon: Layers, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'written', label: 'Written Setup', to: '/admin/written', icon: PenLine, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'histology', label: 'Histology', to: '/admin/histology', icon: Microscope, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'concepts', label: 'Concepts', to: '/admin/concepts', icon: Braces, group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'relationships', label: 'Relationships', to: '/admin/relationships', icon: GitFork, group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-relation-types-v1', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'resources', label: 'Resources & Media', to: '/admin/resources', icon: Clapperboard, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-media-library-v1'],
    apiPrefixes: ['/api/medical-resources', '/api/media'] },
  { id: 'media', label: 'Media Requests', to: '/admin/library/media', icon: ImagePlus, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-media-library-v1'], apiPrefixes: ['/api/media'] },
  { id: 'escalations', label: 'Escalations', to: '/admin/escalations', icon: Siren, group: 'Content',
    stateKeys: [], apiPrefixes: [] },
  { id: 'reports', label: 'Content Reports', to: '/admin/reports', icon: Flag, group: 'Content',
    stateKeys: ['synapse-content-reports-v1'], apiPrefixes: [] },
  { id: 'tutorial', label: 'Tutorial Videos', to: '/admin/tutorial', icon: MonitorPlay, group: 'Content',
    stateKeys: ['synapse-tutorial-videos-v1'], apiPrefixes: [] },

  { id: 'email', label: 'Email & Automations', to: '/admin/email', icon: Mail, group: 'Operations',
    stateKeys: ['synapse-email-automations-v1'], apiPrefixes: [] },
  { id: 'mailbox', label: 'Mail Box', to: '/admin/mailbox', icon: Inbox, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/mail', '/api/mailboxes'] },
  { id: 'notifications', label: 'Student Notifications', to: '/admin/notifications', icon: BellRing, group: 'Operations',
    stateKeys: ['synapse-notification-campaigns-v1'], apiPrefixes: [] },
  { id: 'users', label: 'Users', to: '/admin/users', icon: UserCog, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/users', '/api/admin/enrollment-change-requests'] },
  { id: 'students', label: 'Students', to: '/admin/students', icon: Users, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/students'] },
  { id: 'payments', label: 'Payments & Finance', to: '/admin/payments', icon: Banknote, group: 'Operations',
    stateKeys: ['synapse-plans-v1', 'synapse-plan-catalog-v1', 'synapse-student-id-discount-v1'], apiPrefixes: ['/api/admin/pricing'] },
  { id: 'vouchers', label: 'Vouchers', to: '/admin/vouchers', icon: TicketPercent, group: 'Operations',
    stateKeys: ['synapse-vouchers-v1'], apiPrefixes: [] },
  { id: 'assistant', label: 'AI Assistant', to: '/admin/assistant', icon: Bot, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/assistant'] },
  { id: 'privacy', label: 'Privacy & Support', to: '/admin/privacy', icon: LifeBuoy, group: 'Operations',
    stateKeys: [], apiPrefixes: [] },

  { id: 'settings', label: 'Settings', to: '/admin/settings', icon: Settings, group: 'Governance', superAdminOnly: true,
    stateKeys: ['synapse-storage-limits-v1', 'synapse-system-colors-v1', 'synapse-maristana-config-v1'], apiPrefixes: [] },
  { id: 'audit', label: 'Audit & Security', to: '/admin/audit', icon: ShieldCheck, group: 'Governance', superAdminOnly: true,
    stateKeys: [], apiPrefixes: ['/api/backups', '/api/launch'] },
  { id: 'access', label: 'Access Control', to: '/admin/access', icon: KeyRound, group: 'Governance', superAdminOnly: true,
    stateKeys: [ROLE_TABS_STATE_KEY], apiPrefixes: [] },
]

export const TAB_IDS: string[] = ADMIN_TAB_VIEWS.map((view) => view.id)

const SUPER_ADMIN_ONLY = new Set(ADMIN_TAB_VIEWS.filter((view) => view.superAdminOnly).map((view) => view.id))

export const DEFAULT_ROLE_TABS: Record<string, string[]> = {
  editor: TAB_IDS.filter((id) => !SUPER_ADMIN_ONLY.has(id)),
  admin: [
    'dashboard', 'reports', 'email', 'mailbox', 'notifications',
    'users', 'students', 'payments', 'vouchers', 'assistant', 'privacy',
  ],
  // Exactly two surfaces — Media Requests and Content Reports. Mirror of the
  // server default in server/src/tabs.js; the parity test holds them together.
  reviewer: ['media', 'reports'],
}

/** The tab ids this role holds. Mirrors `tabsForRole` in server/src/tabs.js. */
export function tabsForRole(role: string, storedConfig: unknown): string[] {
  if (role === 'super_admin') return TAB_IDS
  if (rank(role) < 1) return []
  const config = storedConfig && typeof storedConfig === 'object' ? storedConfig as Record<string, unknown> : null
  const stored = config?.[role]
  const wanted = new Set(Array.isArray(stored) ? stored as string[] : DEFAULT_ROLE_TABS[role] ?? [])
  return TAB_IDS.filter((id) => wanted.has(id) && !SUPER_ADMIN_ONLY.has(id))
}

const VIEW_BY_ID = new Map(ADMIN_TAB_VIEWS.map((view) => [view.id, view]))

/** The tabs this role holds, ready to render, in registry order. */
export function tabViewsFor(role: string, storedConfig: unknown): AdminTabView[] {
  return tabsForRole(role, storedConfig)
    .map((id) => VIEW_BY_ID.get(id))
    .filter((view): view is AdminTabView => Boolean(view))
}
