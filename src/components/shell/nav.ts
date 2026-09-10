import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, BookOpen, CalendarRange, Users, UserCog, Layers, Gamepad2, ListChecks, Stethoscope, Inbox,
} from 'lucide-react'
// Relative rather than `@/data/adminTabs`: `nav.test.ts` runs on Node, which
// has no bundler alias, and the nine destinations are exactly the sort of list
// that is worth being able to assert on. Same arrangement as `adminTabs.ts`.
import { ADMIN_TAB_VIEWS, type AdminTabGroup } from '../../data/adminTabs.ts'

export type Portal = 'student' | 'admin'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
  comingSoon?: boolean
  /** Detail pages that keep this section selected. */
  activePaths?: string[]
}

export interface NavGroup {
  label?: string
  items: NavItem[]
}

/** Direct destinations and grouped tools for the student study workflow. */
export const studentNav: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard', to: '/app', icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: 'Study',
    items: [
      { label: 'Plan', to: '/app/calendar', icon: CalendarRange, activePaths: ['/app/university'] },
      { label: 'Library', to: '/app/library', icon: BookOpen, comingSoon: true },
      { label: 'Tools', to: '/app/study-tools', icon: Layers, activePaths: ['/app/resources', '/app/terminology', '/app/taxonomy', '/app/anatomy-atlas', '/app/notebook', '/app/whiteboard', '/app/flashcards'] },
    ],
  },
  {
    label: 'Test yourself',
    items: [
      { label: 'Bank', to: '/app/qbank', icon: ListChecks },
      { label: 'Practice', to: '/app/clinical-practice', icon: Stethoscope, activePaths: ['/app/performance', '/app/oral', '/app/skills', '/app/adaptive', '/app/histology', '/app/practical', '/app/essays'] },
    ],
  },
  {
    label: 'Together',
    items: [
      { label: 'Study Rooms', to: '/app/study-rooms', icon: Users },
      { label: 'Minigames', to: '/app/minigames', icon: Gamepad2 },
    ],
  },
  {
    label: 'You',
    items: [
      { label: 'Account', to: '/app/account', icon: UserCog },
    ],
  },
]

/**
 * What the breadcrumb calls a route the sidebar no longer lists.
 *
 * Nine nav items cannot name twenty-six routes, and a breadcrumb that falls
 * back to the pathname is how a polished app starts showing people URLs. Every
 * mounted student route that is not in `studentNav` belongs here — `nav.test.ts`
 * is the thing that notices when one is added without a title.
 */
export const ROUTE_TITLES: Record<string, string> = {
  // Reached from the dashboard, not the sidebar
  '/app/tutorial': 'Tutorial',
  '/app/plan': 'Plan',
  '/app/learn': 'Library',
  '/app/practice': 'Bank',
  '/app/revise': 'Tools',
  '/app/adaptive': 'Adaptive Study',
  // Plan
  '/app/university': 'University',
  '/app/performance': 'My Analytics',
  // Learn
  '/app/anatomy-atlas': 'Anatomy Atlas',
  '/app/terminology': 'Medical Terminology',
  // The old route keeps the old name: a bookmark that says "Medical Taxonomy"
  // should not silently become a different page's title.
  '/app/taxonomy': 'Medical Terminology',
  '/app/resources': 'Resources',
  // Practice
  '/app/qotd': 'Question of the Day',
  '/app/practical': 'Practical',
  // Off Practical's tab strip and onto the Practice hub in their own right.
  '/app/oral': 'Oral questions',
  '/app/skills': 'Skills',
  '/app/histology': 'Histology Lab',
  '/app/essays': 'Essay questions',
  // Revise
  '/app/notebook': 'Notebook',
  '/app/question-notes': 'Question Notes',
  '/app/whiteboard': 'Whiteboard',
  '/app/flashcards': 'Flashcards',
  // Minigames
  '/app/term-grid': 'Term Grid',
  '/app/spotter': 'Spotter',
  '/app/term-match': 'Term Match',
  '/app/clinical-sequence': 'Clinical Sequence',
  '/app/mechanism-chain': 'Mechanism Chain',
  '/app/red-flag-sort': 'Red Flag Sort',
  '/app/maristanas': 'Build Maristanas',
  // Redirect sources: named so the breadcrumb reads correctly for the instant
  // before the redirect lands, and so ⌘K can still find them by their old name.
  '/app/study-together': 'Study Rooms',
  '/app/billing': 'Billing',
}

const ADMIN_GROUP_ORDER: AdminTabGroup[] = ['Overview', 'Content', 'Operations', 'Governance']

/**
 * The admin sidebar, built from the tab registry rather than beside it.
 *
 * These were two lists that had to agree and had no way to. A tab now appears
 * in the sidebar because the caller holds it — the same fact the server checks
 * when the page saves, so a visible link and a rendering page cannot disagree.
 */
/**
 * A `navHidden` tab is a real capability and route, just not its own sidebar
 * item — several of them are gathered under one entry. The Inbox holds the three
 * moderation queues (each its own access tier); People holds console-user
 * management and the student roster (each independently grantable). The merged
 * entry appears when the viewer holds any of its tabs, and leads to a page that
 * renders only the sections that are theirs.
 */
const NAV_MERGES: { group: AdminTabGroup; tabs: string[]; item: NavItem }[] = [
  { group: 'Content', tabs: ['media', 'escalations', 'reports'], item: { label: 'Inbox', to: '/admin/inbox', icon: Inbox } },
  { group: 'Operations', tabs: ['users', 'students'], item: { label: 'People', to: '/admin/people', icon: Users } },
]

export function adminNavFor(tabs: readonly string[]): NavGroup[] {
  const held = new Set(tabs)
  const mergeOf = new Map(NAV_MERGES.flatMap((m) => m.tabs.map((id) => [id, m] as const)))
  const emitted = new Set<typeof NAV_MERGES[number]>()
  return ADMIN_GROUP_ORDER
    .map((group) => {
      const items: NavItem[] = []
      for (const view of ADMIN_TAB_VIEWS) {
        if (view.group !== group) continue
        if (view.navHidden) {
          // The merged entry takes the slot of the first of its tabs, so it
          // lands where those tabs used to sit.
          const merge = mergeOf.get(view.id)
          if (merge && !emitted.has(merge) && merge.tabs.some((id) => held.has(id))) {
            items.push(merge.item)
            emitted.add(merge)
          }
          continue
        }
        if (held.has(view.id)) items.push({ label: view.label, to: view.to, icon: view.icon, end: view.end })
      }
      // The first group is the dashboard on its own and reads better unlabelled.
      return { label: group === 'Overview' ? undefined : group, items }
    })
    .filter((navGroup) => navGroup.items.length > 0)
}

export function navFor(portal: Portal, tabs: readonly string[] = []): NavGroup[] {
  return portal === 'student' ? studentNav : adminNavFor(tabs)
}

/**
 * The breadcrumb's name for a path: its own nav item, then its explicit title,
 * then the deepest nav item or titled route it sits under, then the portal's
 * home. Never the pathname.
 */
export function titleForPath(pathname: string, portal: Portal, tabs: readonly string[] = []): string {
  const items = navFor(portal, tabs).flatMap((group) => group.items)
  const exact = items.find((item) => item.to === pathname)
  if (exact) return exact.label
  if (portal === 'student' && ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname]

  const root = portal === 'admin' ? '/admin' : '/app'
  const candidates: { to: string; label: string }[] = [
    ...items.map((item) => ({ to: item.to, label: item.label })),
    ...(portal === 'student'
      ? Object.entries(ROUTE_TITLES).map(([to, label]) => ({ to, label }))
      : []),
  ]
  const nested = candidates
    .filter((candidate) => candidate.to !== root && pathname.startsWith(`${candidate.to}/`))
    .sort((a, b) => b.to.length - a.to.length)[0]
  return nested?.label ?? (portal === 'admin' ? 'Control Dashboard' : 'Dashboard')
}
