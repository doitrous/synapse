import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import type { Portal } from './nav'
import { navFor } from './nav'
import { Wordmark } from '@/components/brand/Wordmark'
import { Avatar } from '@/components/ui/Avatar'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { API_MODE } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export function Sidebar({
  portal,
  collapsed,
  onNavigate,
}: {
  portal: Portal
  collapsed: boolean
  onNavigate?: () => void
}) {
  const groups = navFor(portal)
  const t = useT()
  const [profile, setProfile] = useState(() => API_MODE
    ? { name: portal === 'admin' ? 'Admin team' : 'Student', detail: portal === 'admin' ? 'Curriculum admin' : 'Medicine' }
    : { name: 'Maya Adeyemi', detail: portal === 'admin' ? 'Curriculum admin' : 'Year 3 · Medicine' })

  useEffect(() => {
    if (!API_MODE || !supabase) return
    void supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email
      const metadataName = data.user?.user_metadata?.full_name || data.user?.user_metadata?.name
      if (email || metadataName) setProfile({ name: metadataName || email || 'Synapse user', detail: portal === 'admin' ? 'Curriculum admin' : 'Medicine' })
    })
  }, [portal])

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Brand */}
      <div
        className={cn(
          'flex h-14 shrink-0 items-center border-b border-line',
          collapsed ? 'justify-center px-2' : 'px-4',
        )}
      >
        <Wordmark collapsed={collapsed} />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overscroll-contain px-2.5 py-3">
        {groups.map((group, gi) => (
          <div key={group.label ?? gi} className={cn(gi > 0 && 'mt-4')}>
            {group.label &&
              (collapsed ? (
                <div className="mx-2 my-2 h-px bg-line" />
              ) : (
                <div className="px-2.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  {t(group.label)}
                </div>
              ))}
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onNavigate}
                    title={collapsed ? t(item.label) : undefined}
                    className={({ isActive }) =>
                      cn(
                        'group flex h-11 items-center gap-2.5 rounded-md text-[13.5px] transition-colors duration-100 lg:h-9',
                        collapsed ? 'justify-center px-0' : 'px-2.5',
                        isActive
                          ? 'bg-accent-tint font-medium text-accent-strong'
                          : 'text-ink-2 hover:bg-inset hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          icon={item.icon}
                          size={17}
                          className={isActive ? 'text-accent' : 'text-ink-3 group-hover:text-ink-2'}
                        />
                        {!collapsed && <span className="truncate">{t(item.label)}</span>}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="shrink-0 border-t border-line p-2">
        <NavLink
          to={portal === 'admin' ? '/admin/settings' : '/app/account'}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-md py-1.5 text-start transition-colors hover:bg-inset',
            collapsed ? 'justify-center px-0' : 'px-2',
          )}
          title={collapsed ? `${profile.name} · ${profile.detail}` : undefined}
        >
          <Avatar name={profile.name} size="sm" />
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">{profile.name}</span>
                <span className="block truncate text-[11.5px] text-ink-3">
                  {t(profile.detail)}
                </span>
              </span>
              <Icon icon={ChevronsUpDown} size={15} className="text-ink-3" />
            </>
          )}
        </NavLink>
      </div>
    </div>
  )
}
