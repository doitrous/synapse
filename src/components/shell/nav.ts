import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  BookOpen,
  ListChecks,
  Stethoscope,
  CalendarDays,
  LineChart,
  FolderOpen,
  PenTool,
  Notebook,
  Users,
  CreditCard,
  UserCog,
  Languages,
  Compass,
} from 'lucide-react'
import { ADMIN_TAB_VIEWS, type AdminTabGroup } from '@/data/adminTabs'

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

export const studentNav: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard', to: '/app', icon: LayoutDashboard, end: true },
      { label: 'Calendar', to: '/app/calendar', icon: CalendarDays },
    ],
  },
  {
    label: 'Study',
    items: [
      { label: 'Library', to: '/app/library', icon: BookOpen },
      { label: 'Question Bank', to: '/app/qbank', icon: ListChecks },
      { label: 'Adaptive Study', to: '/app/adaptive', icon: Compass },
      { label: 'Practical', to: '/app/practical', icon: Stethoscope },
      { label: 'Resources', to: '/app/resources', icon: FolderOpen },
      { label: 'Medical Taxonomy', to: '/app/taxonomy', icon: Languages },
    ],
  },
  {
    label: 'Plan',
    items: [
      { label: 'Performance', to: '/app/performance', icon: LineChart },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Whiteboard', to: '/app/whiteboard', icon: PenTool },
      { label: 'Notebook', to: '/app/notebook', icon: Notebook },
      { label: 'Study Together', to: '/app/study-together', icon: Users },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Manage your account', to: '/app/account', icon: UserCog },
      { label: 'Billing', to: '/app/billing', icon: CreditCard },
    ],
  },
]

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
