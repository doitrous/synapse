import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Maximize2, Search, Bell, ArrowLeftRight, CalendarClock, BookOpen, BellRing, X, ArrowRight, Languages, LogOut } from 'lucide-react'
import type { Portal } from './nav'
import { navFor } from './nav'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { ThemeSwitch } from './ThemeSwitch'
import { cn } from '@/lib/cn'
import { formatDateTime } from '@/lib/format'
import { useI18n } from '@/lib/i18n'
import { initialNotificationCampaigns, notificationAllowedByPrefs, notificationIsDue, notificationMatchesStudent, NOTIFICATION_READ_STORAGE_KEY, NOTIFICATION_STORAGE_KEY, type NotificationCampaign } from '@/data/notifications'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { API_MODE } from '@/lib/api'

function currentTitle(portal: Portal, pathname: string): string {
  const items = navFor(portal).flatMap((g) => g.items)
  const exact = items.find((i) => i.to === pathname)
  if (exact) return exact.label
  const root = portal === 'admin' ? '/admin' : '/app'
  const nested = items
    .filter((i) => i.to !== root && pathname.startsWith(i.to))
    .sort((a, b) => b.to.length - a.to.length)[0]
  return nested?.label ?? (portal === 'admin' ? 'Control Dashboard' : 'Dashboard')
}

const iconBtn =
  'inline-flex size-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] lg:size-9'

export function Topbar({
  portal,
  collapsed,
  focusMode,
  onToggleCollapse,
  onToggleFocusMode,
  onOpenMobile,
  onOpenSearch,
}: {
  portal: Portal
  collapsed: boolean
  focusMode: boolean
  onToggleCollapse: () => void
  onToggleFocusMode: () => void
  onOpenMobile: () => void
  onOpenSearch: () => void
}) {
  const { pathname } = useLocation()
  const { t, lang, toggle } = useI18n()
  const { audience, role } = useIdentity()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [campaigns] = usePersistentState<NotificationCampaign[]>(NOTIFICATION_STORAGE_KEY, API_MODE ? [] : initialNotificationCampaigns)
  const [readIds, setReadIds] = usePersistentState<string[]>(`${NOTIFICATION_READ_STORAGE_KEY}-${portal}`, [])
  // The student's own notification preferences, from the Account page.
  const [prefs] = usePersistentState<{ reviewReminders: boolean; calendarReminders: boolean }>(
    'synapse.account.prefs.v1',
    { reviewReminders: true, calendarReminders: true },
  )
  const notifications = campaigns
    .filter((campaign) => portal === 'admin' ? campaign.active : notificationMatchesStudent(campaign, audience) && notificationIsDue(campaign) && notificationAllowedByPrefs(campaign, prefs))
    .sort((a, b) => new Date(b.sentAt ?? b.scheduledAt).getTime() - new Date(a.sentAt ?? a.scheduledAt).getTime())
  const [popupId, setPopupId] = useState<string | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const title = currentTitle(portal, pathname)
  const other = portal === 'admin' ? '/app' : '/admin'
  const otherLabel = portal === 'admin' ? t('Student app') : t('Admin console')
  // Only an admin has somewhere to switch to. Showing a student a route that
  // exists solely to bounce them off its guard advertises a door with no key.
  // The demo has no backend and therefore no roles, so nothing is being
  // concealed there — both portals are simply open.
  const canSwitchPortal = role === 'admin' || !API_MODE
  const unreadCount = notifications.filter((notification) => !readIds.includes(notification.id)).length
  const popupNotification = notifications.find((notification) => notification.id === popupId)

  useEffect(() => {
    if (portal !== 'student' || popupId) return
    const unread = notifications.find((notification) => !readIds.includes(notification.id))
    if (unread) setPopupId(unread.id)
  }, [notifications, popupId, portal, readIds])

  useEffect(() => {
    function close(e: MouseEvent) {
      if (!popoverRef.current?.contains(e.target as Node)) setNotificationsOpen(false)
    }
    function key(e: KeyboardEvent) {
      if (e.key === 'Escape') setNotificationsOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', key)
    }
  }, [])

  // Focus mode removes the whole bar, so nothing below needs to be rendered.
  if (focusMode) return null

  return (
    <header className="sticky top-0 z-30 flex h-[calc(3.5rem+env(safe-area-inset-top))] min-w-0 items-center gap-1.5 border-b border-line bg-paper px-2.5 pt-[env(safe-area-inset-top)] sm:gap-2 sm:px-4">
      <button className={cn(iconBtn, 'lg:hidden')} onClick={onOpenMobile} aria-label={t('Open navigation')}>
        <Icon icon={Menu} size={18} />
      </button>
      {/* The same three lines as the mobile control: one affordance for
          "show or hide the menu", rather than two glyphs for one idea. */}
      <button
        className={cn(iconBtn, 'hidden lg:inline-flex')}
        onClick={onToggleCollapse}
        aria-label={collapsed ? t('Expand sidebar') : t('Collapse sidebar')}
        title={collapsed ? t('Expand sidebar') : t('Collapse sidebar')}
      >
        <Icon icon={Menu} size={18} />
      </button>

      <nav className="flex min-w-0 flex-1 items-center gap-2" aria-label="Breadcrumb">
        <span className="hidden text-[12.5px] text-ink-3 sm:inline">
          {portal === 'admin' ? t('Admin console') : t('Student')}
        </span>
        <span className="hidden text-ink-3 sm:inline">/</span>
        <span className="truncate text-[13.5px] font-medium text-ink">{t(title)}</span>
      </nav>

      <div className="ms-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5">
        <button
          onClick={onOpenSearch}
          className="hidden h-9 w-60 items-center gap-2 rounded-md border border-line bg-surface px-3 text-[13px] text-ink-3 transition-colors hover:border-line-2 sm:flex"
        >
          <Icon icon={Search} size={16} />
          <span className="flex-1 text-start">{t('Search…')}</span>
          <Kbd>⌘K</Kbd>
        </button>
        <button onClick={onOpenSearch} className={cn(iconBtn, 'sm:hidden')} aria-label={t('Search')}>
          <Icon icon={Search} size={18} />
        </button>

        <button
          onClick={onToggleFocusMode}
          className={cn(iconBtn, 'hidden lg:inline-flex')}
          aria-label={t('Hide menus')}
          title={t('Hide menus')}
        >
          <Icon icon={Maximize2} size={17} />
        </button>

        <ThemeSwitch className="hidden sm:inline-flex" />

        <button
          onClick={toggle}
          className="hidden h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-[13px] font-medium text-ink-2 transition-colors hover:border-line-2 hover:text-ink sm:inline-flex"
          aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        >
          <Icon icon={Languages} size={15} />
          <span lang={lang === 'ar' ? 'en' : 'ar'}>{lang === 'ar' ? 'EN' : 'العربية'}</span>
        </button>

        {canSwitchPortal && (
          <Link
            to={other}
            className="hidden h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-[13px] font-medium text-ink-2 transition-colors hover:border-line-2 hover:text-ink md:inline-flex"
          >
            <Icon icon={ArrowLeftRight} size={15} />
            {otherLabel}
          </Link>
        )}

        <Link to="/logout" className={iconBtn} aria-label={t('Sign out')} title={t('Sign out')}>
          <Icon icon={LogOut} size={17} />
        </Link>

        <div className="relative" ref={popoverRef}>
          <button
            className={cn(iconBtn, 'relative')}
            aria-label={t('Notifications')}
            aria-haspopup="dialog"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Icon icon={Bell} size={18} />
            {unreadCount > 0 && (
              <span className="absolute end-2 top-2 size-1.5 rounded-full bg-accent ring-2 ring-paper" />
            )}
          </button>
          {notificationsOpen && (
            <div
              role="dialog"
              aria-label={t('Latest notifications')}
              className="animate-pop absolute end-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(36rem,calc(100dvh-5rem-env(safe-area-inset-top)))] w-[min(23rem,calc(100vw-1rem))] overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface shadow-pop"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{t('Latest notifications')}</p>
                  <p className="text-[11.5px] text-ink-3">{unreadCount} {t('unread')}</p>
                </div>
                <button
                  className="text-[12px] font-medium text-accent hover:text-accent-strong"
                  onClick={() => setReadIds((current) => [...new Set([...current, ...notifications.map((notification) => notification.id)])])}
                >
                  {t('Mark all read')}
                </button>
              </div>
              <ul className="p-1.5">
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <Link
                      to={portal === 'admin' ? '/admin/notifications' : notification.to}
                      onClick={() => {
                        setReadIds((current) => current.includes(notification.id) ? current : [...current, notification.id])
                        setNotificationsOpen(false)
                      }}
                      className="flex gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-inset"
                    >
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
                        <Icon icon={notification.delivery === 'Automated' ? CalendarClock : BookOpen} size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-[13px] font-medium text-ink">{notification.title}</span>
                          {!readIds.includes(notification.id) && <span className="size-1.5 shrink-0 rounded-full bg-accent" />}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] text-ink-2">{notification.message}</span>
                        <time className="mt-1 block font-mono text-[10.5px] text-ink-3">{formatDateTime(new Date(notification.sentAt ?? notification.scheduledAt))}</time>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {portal === 'student' && popupNotification && (
        <div className="fixed inset-0 z-[65] grid items-end bg-ink/25 p-3 animate-fade sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="notification-popup-title">
          <div className="animate-pop w-full max-w-md overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
            <div className="flex items-start gap-3 border-b border-line px-4 py-3.5 sm:px-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent"><Icon icon={BellRing} size={18} /></span>
              <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-accent-strong">{t('For your year and group')}</p><h2 id="notification-popup-title" className="mt-0.5 text-[16px] font-bold leading-snug text-ink">{popupNotification.title}</h2></div>
              <button type="button" className="grid size-10 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink sm:size-8" aria-label={t('Close')} onClick={() => { setReadIds((current) => current.includes(popupNotification.id) ? current : [...current, popupNotification.id]); setPopupId(null) }}><Icon icon={X} size={17} /></button>
            </div>
            <div className="px-4 py-5 sm:px-5"><p className="text-[14px] leading-relaxed text-ink-2">{popupNotification.message}</p><p className="mt-3 font-mono text-[10.5px] text-ink-3">{formatDateTime(new Date(popupNotification.sentAt ?? popupNotification.scheduledAt))}</p></div>
            <div className="flex flex-col-reverse gap-2 border-t border-line bg-surface-2/45 px-4 py-3 sm:flex-row sm:justify-end sm:px-5"><button type="button" className="min-h-11 rounded-lg px-3.5 text-[13px] font-semibold text-ink-2 hover:bg-inset sm:min-h-9" onClick={() => { setReadIds((current) => current.includes(popupNotification.id) ? current : [...current, popupNotification.id]); setPopupId(null) }}>{t('Not now')}</button><Link to={popupNotification.to} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent-strong/25 bg-accent px-3.5 text-[13px] font-semibold text-on-accent hover:bg-accent-strong sm:min-h-9" onClick={() => { setReadIds((current) => current.includes(popupNotification.id) ? current : [...current, popupNotification.id]); setPopupId(null) }}>{t('Open')} <Icon icon={ArrowRight} size={15} className="rtl:-scale-x-100" /></Link></div>
          </div>
        </div>
      )}
    </header>
  )
}
