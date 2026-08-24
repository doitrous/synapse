import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Minimize2 } from 'lucide-react'
import type { Portal } from './nav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { StudyAssistant } from '@/components/assistant/StudyAssistant'
import { CommandSearch } from './CommandSearch'
import { StudyContextMenu } from './StudyContextMenu'
import { StudentOnboarding } from '@/components/onboarding/StudentOnboarding'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { cn } from '@/lib/cn'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { useT } from '@/lib/i18n'
import { ImmersionProvider, useImmersion } from './ImmersionContext'

function AppShellInner({ portal }: { portal: Portal }) {
  const t = useT()
  // Both survive navigation and reload: collapsing the chrome to read is a
  // decision about this screen, and having to make it again on every page is
  // what stopped it being useful.
  const [collapsed, , toggleCollapsed] = useLocalPreference('synapse.shell.sidebarCollapsed', false)
  const [focusMode, , toggleFocusMode] = useLocalPreference('synapse.shell.focusMode', false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const { immersive } = useImmersion()
  // The student's own preference is never written by a test — it is only
  // overridden while one is running, and comes straight back afterwards.
  const railed = collapsed || immersive

  // The sidebar destination this URL belongs to: "/app/resources/42" and
  // "/app/resources" are one destination, "/app/library" is another.
  const section = pathname.split('/').slice(0, 3).join('/')

  function openMobile() {
    setMobileOpen(true)
  }

  function closeMobile() {
    setMobileOpen(false)
    window.setTimeout(() => mobileButtonRef.current?.focus(), 0)
  }

  function typingTarget(target: EventTarget | null): boolean {
    const element = target instanceof HTMLElement ? target : null
    if (!element) return false
    if (element.isContentEditable) return true
    return Boolean(element.closest('input, textarea, select, [contenteditable="true"]'))
  }

  // Focus mode hides the chrome, which would also hide the only way back out.
  // Escape is that way out, and it is the key people already try.
  useEffect(() => {
    if (!focusMode) return
    function onKey(event: KeyboardEvent) {
      if (typingTarget(event.target)) return
      if (event.key === 'Escape') toggleFocusMode()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusMode, toggleFocusMode])

  // Global ⌘K / Ctrl-K to toggle search.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (typingTarget(e.target)) return
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setMobileOpen(false), [pathname])

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true })
  }, [section])

  // Keep the page behind the mobile navigation still while the drawer is open.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const drawer = drawerRef.current
    const focusable = drawer?.querySelector<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    window.setTimeout(() => focusable?.focus(), 0)
    function trap(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMobile()
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return
      const items = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trap)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', trap)
    }
  }, [mobileOpen])

  return (
    <div className="min-h-dvh min-w-0">
      <a
        href="#main-content"
        className="fixed start-3 top-3 z-[70] -translate-y-20 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-paper transition-transform focus:translate-y-0"
      >
        {t('Skip to content')}
      </a>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-30 hidden border-e border-line transition-[width] duration-200 ease-[var(--ease-out-quint)]',
          focusMode ? 'lg:hidden' : 'lg:block',
          railed ? 'w-(--spacing-sidebar-collapsed)' : 'w-(--spacing-sidebar)',
        )}
      >
        <Sidebar portal={portal} collapsed={railed} onToggleCollapse={toggleCollapsed} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label={t('Close navigation')}
            className="absolute inset-0 size-full cursor-default bg-ink/30 animate-fade"
            onClick={closeMobile}
          />
          <div ref={drawerRef} className="animate-slide-x absolute inset-y-0 start-0 w-[min(18rem,calc(100vw-3rem))] overscroll-contain border-e border-line pb-[env(safe-area-inset-bottom)] shadow-pop">
            <Sidebar portal={portal} collapsed={false} onNavigate={closeMobile} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div
        className={cn(
          'flex min-h-dvh min-w-0 flex-col transition-[padding] duration-200 ease-[var(--ease-out-quint)]',
          focusMode ? '' : railed ? 'lg:ps-(--spacing-sidebar-collapsed)' : 'lg:ps-(--spacing-sidebar)',
        )}
      >
        <Topbar
          portal={portal}
          focusMode={focusMode}
          onToggleFocusMode={toggleFocusMode}
          mobileButtonRef={mobileButtonRef}
          onOpenMobile={openMobile}
          onOpenSearch={() => setSearchOpen(true)}
        />
        {/* Keyed on the destination, so the arriving screen re-settles by 8px.
            Deliberately the *section* rather than the whole pathname: moving
            between two resources under the same destination is not an arrival,
            and remounting there would throw away the reader's page and zoom.
            The class is on <main> itself rather than an inner wrapper, so
            pages that size themselves against it keep their height contract. */}
        <main ref={mainRef} key={section} id="main-content" className="min-w-0 flex-1 animate-screen-in" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      {/* The way back out of focus mode, for anyone who does not reach for Escape. */}
      {focusMode && (
        <button
          type="button"
          onClick={toggleFocusMode}
          className="fixed end-3 top-3 z-50 inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface/90 px-3 text-[12.5px] font-semibold text-ink-2 shadow-pop backdrop-blur-sm transition-colors hover:text-ink lg:min-h-9"
        >
          <Icon icon={Minimize2} size={15} />
          {t('Show menus')}
          <Kbd>Esc</Kbd>
        </button>
      )}

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <StudyContextMenu onOpenSearch={() => setSearchOpen(true)} />
      {portal === 'student' && <StudentOnboarding />}
      {/* Docked, not a page: the question is nearly always about what is
          already on screen. Renders nothing unless the assistant is on and
          included on this student's plan. */}
      {portal === 'student' && !focusMode && <StudyAssistant />}
    </div>
  )
}

/** The provider has to sit above the routed page, which is what asks for it. */
export function AppShell({ portal }: { portal: Portal }) {
  return (
    <ImmersionProvider>
      <AppShellInner portal={portal} />
    </ImmersionProvider>
  )
}
