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
  PenLine,
  Notebook,
  Users,
  CreditCard,
  ImagePlus,
  UserCog,
  Gauge,
  GraduationCap,
  Library,
  FileQuestion,
  Languages,
  Clapperboard,
  Mail,
  Inbox,
  Banknote,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Flag,
  BellRing,
  TicketPercent,
  Braces,
  GitFork,
  Network,
  Compass,
  Scale,
  Bot,
  Grid3x3,
  Microscope,
} from 'lucide-react'

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
      { label: 'Essay questions', to: '/app/essays', icon: PenLine },
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
      { label: 'Term Grid', to: '/app/term-grid', icon: Grid3x3 },
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

export const adminNav: NavGroup[] = [
  { items: [{ label: 'Control Dashboard', to: '/admin', icon: Gauge, end: true }] },
  {
    label: 'Content',
    items: [
      { label: 'Systems & Topics', to: '/admin/taxonomy', icon: Network },
      { label: 'Glossary', to: '/admin/glossary', icon: Languages },
      { label: 'Academic Setup', to: '/admin/academic', icon: GraduationCap },
      { label: 'Marks & Weights', to: '/admin/academic/marks', icon: Scale },
      { label: 'Library Setup', to: '/admin/library', icon: Library },
      { label: 'Questions Setup', to: '/admin/questions', icon: FileQuestion },
      { label: 'Adaptive Learning', to: '/admin/adaptive', icon: Compass },
      { label: 'Practical Setup', to: '/admin/practical', icon: Stethoscope },
      { label: 'Written Setup', to: '/admin/written', icon: PenLine },
      { label: 'Histology', to: '/admin/histology', icon: Microscope },
      { label: 'Concepts', to: '/admin/concepts', icon: Braces },
      { label: 'Relationships', to: '/admin/relationships', icon: GitFork },
      { label: 'Resources & Media', to: '/admin/resources', icon: Clapperboard },
      { label: 'Media Requests', to: '/admin/library/media', icon: ImagePlus },
      { label: 'Content Reports', to: '/admin/reports', icon: Flag },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Email & Automations', to: '/admin/email', icon: Mail },
      { label: 'Mail Box', to: '/admin/mailbox', icon: Inbox },
      { label: 'Student Notifications', to: '/admin/notifications', icon: BellRing },
      { label: 'Users', to: '/admin/users', icon: UserCog },
      { label: 'Students', to: '/admin/students', icon: Users },
      { label: 'Payments & Finance', to: '/admin/payments', icon: Banknote },
      { label: 'Vouchers', to: '/admin/vouchers', icon: TicketPercent },
      { label: 'AI Assistant', to: '/admin/assistant', icon: Bot },
    ],
  },
  {
    label: 'Governance',
    items: [
      { label: 'Privacy & Support', to: '/admin/privacy', icon: LifeBuoy },
      { label: 'Settings', to: '/admin/settings', icon: Settings },
      { label: 'Audit & Security', to: '/admin/audit', icon: ShieldCheck },
    ],
  },
]

export function navFor(portal: Portal): NavGroup[] {
  return portal === 'student' ? studentNav : adminNav
}
