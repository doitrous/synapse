import { NavLink } from 'react-router-dom'
import { ChevronsUpDown, SlidersHorizontal } from 'lucide-react'
import type { Portal } from './nav'
import { navFor } from './nav'
import { Wordmark } from '@/components/brand/Wordmark'
import { Avatar } from '@/components/ui/Avatar'
import { Icon } from '@/components/ui/Icon'
import { OverflowText } from '@/components/ui/OverflowText'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { ThemeSwitch } from './ThemeSwitch'
import { LanguageSwitch } from './LanguageSwitch'
import { MenuToggle } from './MenuToggle'
import { preloadStudentRoute } from '@/router'
import { cn } from '@/lib/cn'
import { useI18n } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useAvatar } from '@/lib/useAvatar'
import { useUniversityName } from '@/lib/useUniversityCatalogue'
import { ROLE_LABEL, type EffectiveRole } from '@/data/adminRoles'
import { useOpenEscalationCount } from '@/lib/useEscalationBadge'
import { useQotd } from '@/lib/useQotd'

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
  const { t } = useI18n()
  const identity = useIdentity()
  const avatar = useAvatar()
  const groups = navFor(portal, identity.tabs)
  const escalationCount = useOpenEscalationCount()
  // Only the student sidebar renders the dot this feeds, so the hook does no
  // work (and makes no request) off the student app.
  const qotd = useQotd(portal === 'student')
  const qotdUnanswered = portal === 'student' && !qotd.loading && !qotd.answered
  // `audience`, not `profile`: the roster record is authoritative but often
  // absent, and `audience` is the merge of it with what the student told
  // onboarding. Reading `profile` here showed nothing to every student whose
  // university has not filed them yet — which is most of them on day one.
  const universityShort = useUniversityName(identity.audience.universityId, 'short')
  const universityName = useUniversityName(identity.audience.universityId)

  // The admin line names the actual role — Reviewer, Editor, Admin, Super admin —
  // never a single blanket title, so a reviewer is never labelled as more than
  // they are. The student line falls back to "Medicine" rather than inventing a
  // cohort this person may not be in.
  const roleLabel = t(ROLE_LABEL[identity.role as EffectiveRole] ?? 'Team')
  const detail = portal === 'admin'
    ? roleLabel
    : [universityShort, identity.audience.year].filter(Boolean).join(' · ') || t('Medicine')
  const detailTitle = portal === 'admin'
    ? roleLabel
    : [universityName, identity.audience.year].filter(Boolean).join(' · ')
  const profile = { name: identity.displayName, detail }
  // Never point somebody at a screen their role cannot open. Only a super admin
  // holds Settings; everyone else on the admin side lands on their console home,
  // which resolves to the first surface they actually hold.
  const accountHref = portal === 'admin'
    ? (identity.tabs.includes('settings') ? '/admin/settings' : '/admin')
    : '/app/account'

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
                    className={({ isActive }) =>
                      cn(
                        'group relative flex h-11 items-center gap-2.5 rounded-md text-[13.5px] transition-colors duration-100 lg:h-9',
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
                        {collapsed ? (
                          <span role="tooltip" className="pointer-events-none absolute start-[calc(100%+0.5rem)] top-1/2 z-[90] hidden w-max max-w-56 -translate-y-1/2 rounded-lg border border-line bg-ink px-2.5 py-1.5 text-[11.5px] font-medium leading-snug text-paper shadow-pop group-hover:block group-focus-visible:block">
                            {t(item.label)}
                          </span>
                        ) : (
                          <OverflowText>{t(item.label)}</OverflowText>
                        )}
                        {item.to === '/admin/escalations' && escalationCount > 0 && (
                          collapsed ? (
                            <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
                          ) : (
                            <span
                              className="ms-auto inline-flex min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[10.5px] font-bold text-on-danger"
                              aria-label={t('{count} open escalations').replace('{count}', String(escalationCount))}
                            >
                              {escalationCount}
                            </span>
                          )
                        )}
                        {/* Question of the Day is no longer its own nav item,
                            so the unanswered signal moves to the Dashboard —
                            which is where the card that answers it now lives. */}
                        {item.to === '/app' && qotdUnanswered && (
                          collapsed ? (
                            <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                          ) : (
                            <span
                              className="ms-auto h-2 w-2 shrink-0 rounded-full bg-primary"
                              aria-label={t('Not answered yet today')}
                            />
                          )
                        )}
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
            <ThemeSwitch className="flex w-full" />
            <LanguageSwitch className="flex w-full [&>button]:flex-1" />
          </div>
        )}
      </div>

      {/* User */}
      <div className="shrink-0 border-t border-line p-2">
        <NavLink
          to={accountHref}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-md py-1.5 text-start transition-colors hover:bg-inset',
            collapsed ? 'justify-center px-0' : 'px-2',
          )}
        >
          <Avatar name={profile.name} size="sm" src={avatar.src} />
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <OverflowText className="text-[13px] font-medium text-ink">{profile.name}</OverflowText>
                <OverflowText className="text-[11.5px] text-ink-3" tooltip={detailTitle || profile.detail}>
                  {profile.detail}
                </OverflowText>
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
              <ThemeSwitch className="flex w-full" />
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
