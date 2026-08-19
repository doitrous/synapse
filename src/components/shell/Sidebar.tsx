import { NavLink } from 'react-router-dom'
import { ChevronsUpDown, SlidersHorizontal } from 'lucide-react'
import type { Portal } from './nav'
import { navFor } from './nav'
import { Wordmark } from '@/components/brand/Wordmark'
import { Avatar } from '@/components/ui/Avatar'
import { Icon } from '@/components/ui/Icon'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { ThemeSwitch } from './ThemeSwitch'
import { LanguageSwitch } from './LanguageSwitch'
import { MenuToggle } from './MenuToggle'
import { preloadStudentRoute } from '@/router'
import { cn } from '@/lib/cn'
import { useI18n } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useUniversityName } from '@/lib/useUniversityCatalogue'

export function Sidebar({
  portal,
  collapsed,
  onToggleCollapse,
  onNavigate,
}: {
  portal: Portal
  collapsed: boolean
  /** Absent in the mobile drawer, which has nothing to collapse into. */
  onToggleCollapse?: () => void
  onNavigate?: () => void
}) {
  const groups = navFor(portal)
  const { t } = useI18n()
  const identity = useIdentity()
  // `audience`, not `profile`: the roster record is authoritative but often
  // absent, and `audience` is the merge of it with what the student told
  // onboarding. Reading `profile` here showed nothing to every student whose
  // university has not filed them yet — which is most of them on day one.
  const universityShort = useUniversityName(identity.audience.universityId, 'short')
  const universityName = useUniversityName(identity.audience.universityId)

  // Whatever the account actually says, and nothing more: the line falls back
  // to "Medicine" rather than inventing a cohort this person may not be in.
  const detail = portal === 'admin'
    ? t('Curriculum admin')
    : [universityShort, identity.audience.year].filter(Boolean).join(' · ') || t('Medicine')
  const detailTitle = portal === 'admin'
    ? t('Curriculum admin')
    : [universityName, identity.audience.year].filter(Boolean).join(' · ')
  const profile = { name: identity.displayName, detail }

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

      {/* The three lines belong with the menu they open, not in the top bar
          across the page from it. */}
      {onToggleCollapse && (
        <div className={cn('shrink-0 pt-2', collapsed ? 'flex justify-center px-2' : 'px-2.5')}>
          <MenuToggle open={!collapsed} onToggle={onToggleCollapse} label="navigation" />
        </div>
      )}

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
                    onMouseEnter={() => preloadStudentRoute(item.to)}
                    onFocus={() => preloadStudentRoute(item.to)}
                    onTouchStart={() => preloadStudentRoute(item.to)}
                    title={collapsed ? t(item.label) : undefined}
                    className={({ isActive }) =>
                      cn(
                        'group flex h-11 items-center gap-2.5 rounded-md text-[13.5px] transition-colors duration-100 lg:h-9',
                        collapsed ? 'justify-center px-0' : 'px-2.5',
                        isActive
                          ? 'nav-selected font-medium'
                          : 'text-ink-2 hover:bg-inset hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          icon={item.icon}
                          size={17}
                          className={isActive ? 'text-primary' : 'text-ink-3 group-hover:text-ink-2'}
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

      {/* Appearance, then language, then who this is — the order asked for, and
          the order they are reached in: how the app looks, what it speaks, whose
          it is. Both were previously in the top bar and hidden below `sm`,
          which left the theme reachable only from the account page on a phone. */}
      <div className="shrink-0 border-t border-line px-2 py-2">
        {collapsed ? (
          <RailPreferences />
        ) : (
          <div className="space-y-1.5">
            <ThemeSwitch className="flex w-full [&>button]:flex-1" />
            <LanguageSwitch className="flex w-full [&>button]:flex-1" />
          </div>
        )}
      </div>

      {/* User */}
      <div className="shrink-0 border-t border-line p-2">
        <NavLink
          to={portal === 'admin' ? '/admin/settings' : '/app/account'}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-md py-1.5 text-start transition-colors hover:bg-inset',
            collapsed ? 'justify-center px-0' : 'px-2',
          )}
          title={collapsed ? `${profile.name} · ${detailTitle || profile.detail}` : undefined}
        >
          <Avatar name={profile.name} size="sm" />
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">{profile.name}</span>
                <span className="block truncate text-[11.5px] text-ink-3" title={detailTitle || undefined}>
                  {profile.detail}
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

/**
 * The same two controls in a 68px rail.
 *
 * Five segments do not fit, and cycling on click would mean a control whose
 * only affordance is trial and error. A popover keeps both choices visible and
 * labelled at any width.
 */
function RailPreferences() {
  const { t } = useI18n()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t('Appearance and language')}
        title={t('Appearance and language')}
        className="mx-auto grid size-9 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink"
      >
        <Icon icon={SlidersHorizontal} size={16} />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} placement="top-start" label={t('Appearance and language')} className="p-2.5">
          <div className="space-y-2">
            <div>
              <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Appearance')}</p>
              <ThemeSwitch className="flex w-full [&>button]:flex-1" />
            </div>
            <div>
              <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Language')}</p>
              <LanguageSwitch className="flex w-full [&>button]:flex-1" />
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}
