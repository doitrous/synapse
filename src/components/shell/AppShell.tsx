import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Minimize2 } from 'lucide-react'
import type { Portal } from './nav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { CommandSearch } from './CommandSearch'
import { StudyContextMenu } from './StudyContextMenu'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { cn } from '@/lib/cn'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { useT } from '@/lib/i18n'

export function AppShell({ portal }: { portal: Portal }) {
  const t = useT()
  // Both survive navigation and reload: collapsing the chrome to read is a
  // decision about this screen, and having to make it again on every page is
  // what stopped it being useful.
  const [collapsed, , toggleCollapsed] = useLocalPreference('synapse.shell.sidebarCollapsed', false)
  const [focusMode, , toggleFocusMode] = useLocalPreference('synapse.shell.focusMode', false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

  // Focus mode hides the chrome, which would also hide the only way back out.
  // Escape is that way out, and it is the key people already try.
  useEffect(() => {
    if (!focusMode) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') toggleFocusMode()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusMode, toggleFocusMode])

  // Global ⌘K / Ctrl-K to toggle search.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
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

  // Keep the page behind the mobile navigation still while the drawer is open.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
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
          collapsed ? 'w-(--spacing-sidebar-collapsed)' : 'w-(--spacing-sidebar)',
        )}
      >
        <Sidebar portal={portal} collapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label={t('Close navigation')}
            className="absolute inset-0 size-full cursor-default bg-ink/30 animate-fade"
            onClick={() => setMobileOpen(false)}
          />
          <div className="animate-slide-x absolute inset-y-0 start-0 w-[min(18rem,calc(100vw-3rem))] overscroll-contain border-e border-line pb-[env(safe-area-inset-bottom)] shadow-pop">
            <Sidebar portal={portal} collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div
        className={cn(
          'flex min-h-dvh min-w-0 flex-col transition-[padding] duration-200 ease-[var(--ease-out-quint)]',
          focusMode ? '' : collapsed ? 'lg:ps-(--spacing-sidebar-collapsed)' : 'lg:ps-(--spacing-sidebar)',
        )}
      >
        <Topbar
          portal={portal}
          collapsed={collapsed}
          focusMode={focusMode}
          onToggleCollapse={toggleCollapsed}
          onToggleFocusMode={toggleFocusMode}
          onOpenMobile={() => setMobileOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />
        <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
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
      <StudyContextMenu />
    </div>
  )
}
