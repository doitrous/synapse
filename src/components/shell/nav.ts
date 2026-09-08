import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, BookOpen, CalendarRange, Users, UserCog, Layers, Gamepad2, Target, Radar,
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
}

export interface NavGroup {
  label?: string
  items: NavItem[]
}

/**
 * Nine destinations, one unlabelled group.
 *
 * This was twenty-two items under five captions, which is a directory rather
 * than a way of getting anywhere: a student looking for flashcards had to know
 * that "Workspace" is where flashcards live. The four verbs in the middle —
 * Plan, Learn, Practice, Revise — are hub pages that gather what those groups
 * used to list, so the sidebar names what you are trying to do and the hub
 * names the tool. Taking in (Plan, Learn) and giving back (Practice, Revise)
 * sit under separate captions so the two halves of a study day read apart.
 * Nothing was removed; every old route is still reachable from
 * a hub, from a redirect, or from the ⌘K palette, and every one of them keeps a
 * breadcrumb title in `ROUTE_TITLES`.
 *
 * "Revise" rather than "Consolidate": one word every medical student already
 * uses, it names what Notebook, Whiteboard and Flashcards are for, and it
 * translates cleanly (مراجعة).
 */
export const studentNav: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard', to: '/app', icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: 'Study',
    items: [
      { label: 'Plan', to: '/app/plan', icon: CalendarRange },
      { label: 'Learn', to: '/app/learn', icon: BookOpen },
    ],
  },
  {
    label: 'Test yourself',
    items: [
      { label: 'Practice', to: '/app/practice', icon: Target },
      { label: 'Adaptive Study', to: '/app/adaptive', icon: Radar },
      { label: 'Revise', to: '/app/revise', icon: Layers },
    ],
  },
  {
    label: 'Together',
    items: [
      { label: 'Minigames', to: '/app/minigames', icon: Gamepad2 },
      { label: 'Study Rooms', to: '/app/study-rooms', icon: Users },
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
  // Plan
  '/app/calendar': 'Calendar',
  '/app/university': 'University',
  '/app/performance': 'Performance',
  // Learn
  '/app/library': 'Library',
  '/app/terminology': 'Medical Terminology',
  // The old route keeps the old name: a bookmark that says "Medical Taxonomy"
  // should not silently become a different page's title.
  '/app/taxonomy': 'Medical Terminology',
  '/app/resources': 'Resources',
  '/app/anatomy-atlas': 'Anatomy Atlas',
  // Practice
  '/app/qbank': 'Question Bank',
  '/app/qotd': 'Question of the Day',
  '/app/practical': 'Practical',
  // Off Practical's tab strip and onto the Practice hub in their own right.
  '/app/oral': 'Oral questions',
  '/app/skills': 'Skills',
  '/app/histology': 'Histology',
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
export function adminNavFor(tabs: readonly string[]): NavGroup[] {
  const held = new Set(tabs)
  const visible = ADMIN_TAB_VIEWS.filter((view) => held.has(view.id))
  return ADMIN_GROUP_ORDER
    .map((group) => ({
      // The first group is the dashboard on its own and reads better unlabelled.
      label: group === 'Overview' ? undefined : group,
      items: visible
        .filter((view) => view.group === group)
        .map((view) => ({ label: view.label, to: view.to, icon: view.icon, end: view.end })),
    }))
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
