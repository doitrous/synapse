import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Bell, CalendarClock, BookOpen, BellRing, X, ArrowRight, Maximize, Minimize } from 'lucide-react'
import type { Portal } from './nav'
import { titleForPath } from './nav'
import { Icon } from '@/components/ui/Icon'
import { TopbarAccount, TopbarTools } from './TopbarTools'
import { cn } from '@/lib/cn'
import { formatDateTime } from '@/lib/format'
import { useI18n } from '@/lib/i18n'
import { initialNotificationCampaigns, notificationAllowedByPrefs, notificationIsDue, notificationMatchesStudent, NOTIFICATION_READ_STORAGE_KEY, NOTIFICATION_STORAGE_KEY, type NotificationCampaign } from '@/data/notifications'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { useFullscreen } from '@/lib/useFullscreen'
import { hasConsoleAccess } from '@/data/adminRoles'
import { API_MODE, apiGet, apiPost } from '@/lib/api'

const iconBtn =
  'inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-transparent text-ink-2 transition-colors hover:border-line hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:size-9'

export function Topbar({
  portal,
  focusMode,
  onToggleFocusMode,
  mobileButtonRef,
  onOpenMobile,
  onOpenSearch,
}: {
  portal: Portal
  focusMode: boolean
  onToggleFocusMode: () => void
  mobileButtonRef?: RefObject<HTMLButtonElement | null>
  onOpenMobile: () => void
  onOpenSearch: () => void
}) {
  const { pathname } = useLocation()
  const { t } = useI18n()
  const { audience, role, tabs } = useIdentity()
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [campaigns] = usePersistentState<NotificationCampaign[]>(NOTIFICATION_STORAGE_KEY, API_MODE ? [] : initialNotificationCampaigns)
  const [sharedNotifications, setSharedNotifications] = useState<NotificationCampaign[]>([])
  const [readIds, setReadIds] = usePersistentState<string[]>(`${NOTIFICATION_READ_STORAGE_KEY}-${portal}`, [])
  // The student's own notification preferences, from the Account page.
  const [prefs] = usePersistentState<{ reviewReminders: boolean; calendarReminders: boolean }>(
    'nishany.account.prefs.v1',
    { reviewReminders: true, calendarReminders: true },
  )
  const notifications = [
    ...campaigns.filter((campaign) =>
      portal === 'admin'
        ? campaign.active
        : notificationMatchesStudent(campaign, audience) && notificationIsDue(campaign) && notificationAllowedByPrefs(campaign, prefs),
    ),
    ...(portal === 'student' ? sharedNotifications : []),
  ].sort((a, b) => new Date(b.sentAt ?? b.scheduledAt).getTime() - new Date(a.sentAt ?? a.scheduledAt).getTime())
  const [popupId, setPopupId] = useState<string | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const title = titleForPath(pathname, portal, tabs)
  // Only an admin has somewhere to switch to. Showing a student a route that
  // exists solely to bounce them off its guard advertises a door with no key.
  // The demo has no backend and therefore no roles, so nothing is being
  // concealed there — both portals are simply open.
  // Anyone with the console can cross between the two portals — not only the
  // one role that used to be the whole of it.
  const canSwitchPortal = hasConsoleAccess(role ?? '') || !API_MODE
  const unreadCount = notifications.filter((notification) => !readIds.includes(notification.id)).length
  const popupNotification = notifications.find((notification) => notification.id === popupId)

  useEffect(() => {
    if (!API_MODE || portal !== 'student') return
    let active = true
    void apiGet<NotificationCampaign[]>('/notifications/shared').then((items) => {
      if (active) setSharedNotifications(items)
    }).catch(() => undefined)
    return () => { active = false }
  }, [portal])

  function markRead(ids: string[]) {
    const unique = [...new Set(ids)]
    setReadIds((current) => [...new Set([...current, ...unique])])
    const serverIds = unique.filter((id) => sharedNotifications.some((notification) => notification.id === id))
    if (serverIds.length) void apiPost('/notifications/shared/read', { ids: serverIds }).catch(() => undefined)
  }

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
      {/* The desktop collapse control now lives in the sidebar, with the menu it
          opens. This one stays: on a phone there is no sidebar to put it in. */}
      <button ref={mobileButtonRef} type="button" className={cn(iconBtn, 'lg:hidden')} onClick={onOpenMobile} aria-label={t('Open navigation')}>
        <Icon icon={Menu} size={18} />
      </button>

      <nav className="flex min-w-0 flex-1 items-center gap-1.5" aria-label={t('Breadcrumb')}>
        {/* The portal word is context, not the destination: it only earns a
            place once the window is wide enough that the title is not the
            thing being crowded. */}
        <span className="hidden text-[13px] text-ink-3 lg:inline">
          {portal === 'admin' ? t('Admin console') : t('Student')}
        </span>
        <span className="hidden text-ink-3 lg:inline">/</span>
        <span className="truncate text-[14px] font-semibold text-ink">{t(title)}</span>
      </nav>

      <div className="ms-auto flex shrink-0 items-center gap-2">
        {/* Pomodoro · Focus audio · Tools. Search is the Tools menu's first row
            now: the bar was giving width to a box nobody typed into — the
            palette it opens is the field — and the two study tools earn the
            permanent slots instead, because a countdown behind a menu is a
            countdown you cannot see. ⌘K still works from anywhere. */}
        {/* Fullscreen rides inside the tools cluster, just before the dropdown:
            one press, no menu, and the icon says which way it will go. Not on
            phones — the bar is full there and iOS ignores the fullscreen API. */}
        <TopbarTools
          portal={portal}
          focusMode={focusMode}
          onToggleFocusMode={onToggleFocusMode}
          onOpenSearch={onOpenSearch}
          beforeMenu={(
            <div className="hidden sm:block">
            <button
              type="button"
              className={iconBtn}
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? t('Exit fullscreen') : t('Fullscreen')}
              aria-pressed={isFullscreen}
            >
              <Icon icon={isFullscreen ? Minimize : Maximize} size={18} />
            </button>
            </div>
          )}
        />


        <div className="relative" ref={popoverRef}>
            <button
              type="button"
              className={cn(iconBtn, 'relative')}
              aria-label={t('Notifications')}
              aria-haspopup="dialog"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              <Icon icon={Bell} size={18} />
              {unreadCount > 0 && (
                <span className="absolute end-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-paper" />
              )}
            </button>
          {notificationsOpen && (
            <div
              role="dialog"
              aria-label={t('Latest notifications')}
              className="animate-pop fixed inset-x-2 top-[calc(3.5rem+env(safe-area-inset-top)+0.5rem)] z-50 max-h-[min(36rem,calc(100dvh-5rem-env(safe-area-inset-top)))] overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface shadow-pop sm:absolute sm:inset-x-auto sm:end-0 sm:top-[calc(100%+0.5rem)] sm:w-[23rem]"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{t('Latest notifications')}</p>
                  <p className="text-[11.5px] text-ink-3">{unreadCount} {t('unread')}</p>
                </div>
                <button
                  type="button"
                  className="min-h-11 rounded-md px-2 text-[12px] font-medium text-primary hover:bg-primary-tint sm:min-h-9 hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                  onClick={() => markRead(notifications.map((notification) => notification.id))}
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
                        markRead([notification.id])
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
                          {!readIds.includes(notification.id) && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
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

        <TopbarAccount portal={portal} canSwitchPortal={canSwitchPortal} />
      </div>
      {portal === 'student' && popupNotification && (
        <div className="fixed inset-0 z-[65] grid items-end bg-ink/25 p-3 animate-fade sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="notification-popup-title">
          <div className="animate-pop w-full max-w-md overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
            <div className="flex items-start gap-3 border-b border-line px-4 py-3.5 sm:px-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary"><Icon icon={BellRing} size={18} /></span>
              <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-primary-strong">{t('For your year and group')}</p><h2 id="notification-popup-title" className="mt-0.5 text-[16px] font-bold leading-snug text-ink">{popupNotification.title}</h2></div>
              <button type="button" className="grid size-10 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink sm:size-8" aria-label={t('Close')} onClick={() => { markRead([popupNotification.id]); setPopupId(null) }}><Icon icon={X} size={17} /></button>
            </div>
            <div className="px-4 py-5 sm:px-5"><p className="text-[14px] leading-relaxed text-ink-2">{popupNotification.message}</p><p className="mt-3 font-mono text-[10.5px] text-ink-3">{formatDateTime(new Date(popupNotification.sentAt ?? popupNotification.scheduledAt))}</p></div>
            <div className="flex flex-col-reverse gap-2 border-t border-line bg-surface-2/45 px-4 py-3 sm:flex-row sm:justify-end sm:px-5"><button type="button" className="min-h-11 rounded-lg px-3.5 text-[13px] font-semibold text-ink-2 hover:bg-inset sm:min-h-9" onClick={() => { markRead([popupNotification.id]); setPopupId(null) }}>{t('Not now')}</button><Link to={popupNotification.to} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary-strong/25 bg-primary px-3.5 text-[13px] font-semibold text-on-primary hover:bg-primary-hover sm:min-h-9" onClick={() => { markRead([popupNotification.id]); setPopupId(null) }}>{t('Open')} <Icon icon={ArrowRight} size={15} className="rtl:-scale-x-100" /></Link></div>
          </div>
        </div>
      )}
    </header>
  )
}
