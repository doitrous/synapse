import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import type { Portal } from './nav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { CommandSearch } from './CommandSearch'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

export function AppShell({ portal }: { portal: Portal }) {
  const t = useT()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

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
          'fixed inset-y-0 start-0 z-30 hidden border-e border-line transition-[width] duration-200 ease-[var(--ease-out-quint)] lg:block',
          collapsed ? 'w-[4.25rem]' : 'w-[15rem]',
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
          collapsed ? 'lg:ps-[4.25rem]' : 'lg:ps-[15rem]',
        )}
      >
        <Topbar
          portal={portal}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          onOpenMobile={() => setMobileOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />
        <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
