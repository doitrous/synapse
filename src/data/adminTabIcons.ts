/**
 * The lucide component behind each admin tab's `icon` name.
 *
 * Kept apart from `adminTabs.ts` on purpose. That module carries the tab
 * registry (id, route, gating) and is imported eagerly by the router, so if the
 * icon *components* lived there, the whole shared lucide `icons` chunk (~87KB)
 * would load on every page — marketing and login included — just to build
 * routes that never draw an icon. `adminTabs.ts` now names its icon as a string
 * and type-imports `AdminTabIconName` from here (erased at build), so this map
 * is pulled only by the admin surfaces that actually render an icon (the
 * sidebar nav, Access Control, Placeholder) — all lazy.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Gauge, ChartColumnBig, Network, Languages, GraduationCap, Scale, Compass,
  GitFork, ImagePlus, Flag, MonitorPlay, FileText, FolderOpen, Mail, Inbox, BellRing,
  Siren, UserCog, Users, Banknote, TicketPercent, Bot, LifeBuoy, Settings, ShieldCheck,
  KeyRound, ClipboardCheck,
} from 'lucide-react'

export const ADMIN_TAB_ICONS = {
  Gauge, ChartColumnBig, Network, Languages, GraduationCap, Scale, Compass,
  GitFork, ImagePlus, Flag, MonitorPlay, FileText, FolderOpen, Mail, Inbox, BellRing,
  Siren, UserCog, Users, Banknote, TicketPercent, Bot, LifeBuoy, Settings, ShieldCheck,
  KeyRound, ClipboardCheck,
} satisfies Record<string, LucideIcon>

export type AdminTabIconName = keyof typeof ADMIN_TAB_ICONS
