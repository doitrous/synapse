import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowLeftRight, AudioLines, ChevronRight, LogOut, Maximize, Minimize, Maximize2, Search, Settings, SlidersHorizontal, TimerReset, UserRound, type LucideIcon,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Kbd } from '@/components/ui/Kbd'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { countOverlays } from '@/lib/overlayStack'
import { Toggle } from '@/components/ui/Toggle'
import { PomodoroPanel, usePomodoro, type PomodoroEngine } from './PomodoroTimer'
import { FocusAudioPanel, useFocusAudio } from './FocusAudioPlayer'
import type { Portal } from './nav'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { useFullscreen } from '@/lib/useFullscreen'
import { useIdentity } from '@/lib/useIdentity'
import { useAvatar } from '@/lib/useAvatar'
import { useUniversityName } from '@/lib/useUniversityCatalogue'
import { ROLE_LABEL, type EffectiveRole } from '@/data/adminRoles'

/**
 * The end of the top bar: the timer, the sound picker, the Tools menu and the
 * account.
 *
 * The two study tools sit on the bar itself, each with its own popover, so the
 * countdown is visible without a press and reachable in one. Tools keeps what
 * has no business being a permanent icon — Search, which opens the command
 * palette, and the switch that hides the menus.
 *
 * `usePomodoroEngine` is called by `StudentTools`, which the bar always mounts,
 * never inside a popover: a popover unmounts what it holds, and the clock has
 * to keep ticking, chiming and notifying while every surface is shut.
 */

const TRIGGER =
  'inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent text-ink-2 transition-[background-color,border-color,color,width] hover:border-line hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:h-9'

const ROW =
  'flex min-h-11 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-start transition-colors hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-primary)]'

function RowIcon({ icon }: { icon: LucideIcon }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
      <Icon icon={icon} size={15} />
    </span>
  )
}

function PanelHead({ title, hint, onBack, action }: { title: string; hint?: string; onBack?: () => void; action?: ReactNode }) {
  const t = useT()
  return (
    <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={t('Back')}
            className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-primary)] sm:size-8"
          >
            <Icon icon={ArrowLeft} size={16} className="rtl:-scale-x-100" />
          </button>
        )}
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-ink">{title}</p>
          {hint && <p className="mt-0.5 truncate text-[10.5px] text-ink-3">{hint}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

type View = 'root' | 'pomodoro' | 'audio'

/**
 * Escape steps back one level before it closes a surface that has sub-views.
 *
 * On `window`, whose capture phase runs before the `document` listener
 * `Popover` closes on, and skipped while anything modal is above us. Losing two
 * levels at once from a settings view would be a silent regression on what the
 * old pomodoro panel did.
 */
function useEscapeStep(active: boolean, back: () => void) {
  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || countOverlays('dialog')) return
      event.preventDefault()
      event.stopPropagation()
      back()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [active, back])
}

/**
 * The timer, on the bar rather than behind the Tools menu.
 *
 * Omar wanted the countdown reachable in one press, and visible without one:
 * the trigger widens to carry the running time the way the Tools button used
 * to. The engine is not called here — it belongs to the always-mounted parent,
 * because this popover unmounts its panel every time it closes.
 */
function PomodoroButton({ engine, className }: { engine: PomodoroEngine; className?: string }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const running = engine.running

  useEffect(() => { if (!open) setSettingsOpen(false) }, [open])
  useEscapeStep(open && settingsOpen, useCallback(() => setSettingsOpen(false), []))

  const label = running ? `${t('Pomodoro')} — ${t(engine.modeLabel)} ${engine.timeLabel}` : t('Pomodoro')

  return (
    <>
        <button
          type="button"
          ref={setAnchor}
          onClick={() => setOpen((current) => !current)}
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            TRIGGER,
            // Pinned, or the end cluster shifts when the countdown drops a
            // digit at 10:00 and again at 1:00 — `width: auto` cannot animate.
            running ? 'min-w-[5.4rem] bg-inset px-2.5 text-ink sm:min-w-[5rem]' : 'w-11 sm:w-9',
            open && 'bg-inset text-ink',
            className,
          )}
        >
          <Icon icon={TimerReset} size={18} strokeWidth={2.1} />
          {running && (
            <span className="tnum font-mono text-[12px] font-semibold tracking-[-0.02em] text-ink" aria-hidden>
              {engine.timeLabel}
            </span>
          )}
        </button>

      {open && (
        <Popover
          anchor={anchor}
          onClose={close}
          placement="bottom-end"
          label={settingsOpen ? t('Timer settings') : t('Focus timer')}
          focusKey={String(settingsOpen)}
          className="w-[min(20rem,calc(100vw-1rem))]"
        >
          <PanelHead
            title={settingsOpen ? t('Timer settings') : t('Focus timer')}
            hint={settingsOpen ? t('Make the blocks fit how you study.') : t('Work in calm, deliberate blocks.')}
            onBack={settingsOpen ? () => setSettingsOpen(false) : undefined}
            action={!settingsOpen ? (
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                aria-label={t('Timer settings')}
                className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-primary)] sm:size-9"
              >
                <Icon icon={Settings} size={16} />
              </button>
            ) : undefined}
          />
          <PomodoroPanel engine={engine} settingsOpen={settingsOpen} />
        </Popover>
      )}
    </>
  )
}

/** The sound picker, likewise promoted out of the menu onto the bar. */
function AudioButton({ playing, className }: { playing: boolean; className?: string }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const label = playing ? `${t('Focus audio')} — ${t('Playing')}` : t('Focus audio')

  return (
    <>
        <button
          type="button"
          ref={setAnchor}
          onClick={() => setOpen((current) => !current)}
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(TRIGGER, 'w-11 sm:w-9', open && 'bg-inset text-ink', className)}
        >
          <span className="relative inline-flex">
            <Icon icon={AudioLines} size={18} strokeWidth={2.1} />
            {playing && <span className="absolute -end-1 -top-1 size-1.5 rounded-full bg-primary ring-2 ring-paper" />}
          </span>
        </button>

      {open && (
        <Popover
          anchor={anchor}
          onClose={close}
          placement="bottom-end"
          label={t('Focus sounds')}
          className="w-[min(20rem,calc(100vw-1rem))]"
        >
          <PanelHead title={t('Focus sounds')} hint={t('Generated on your device · no streaming')} />
          <FocusAudioPanel />
        </Popover>
      )}
    </>
  )
}

/**
 * What is left of the menu: Search, and the switch that gives the page the
 * whole screen. Two rows is thin, but a menu whose contents you can predict is
 * worth more than one that hides four unrelated things.
 *
 * Below `sm` it also carries the pomodoro and the sound picker as rows. Six
 * icon buttons plus the page title do not fit across 390 px — measured — and a
 * title squeezed to two characters costs more than one extra press.
 */
function ToolsMenu({
  focusMode,
  onToggleFocusMode,
  onOpenSearch,
  engine,
  audioPlaying,
}: {
  focusMode: boolean
  onToggleFocusMode: () => void
  onOpenSearch: () => void
  engine?: PomodoroEngine
  audioPlaying?: boolean
}) {
  const t = useT()
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
  const fullscreenSupported = typeof document !== 'undefined' && document.fullscreenEnabled
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const [view, setView] = useState<View>('root')
  const [timerSettings, setTimerSettings] = useState(false)
  const running = engine?.running === true
  const active = running || audioPlaying === true

  // A menu that reopens three levels deep is a menu that lost its place.
  useEffect(() => {
    if (!open) { setView('root'); setTimerSettings(false) }
  }, [open])

  useEscapeStep(open && (view !== 'root' || timerSettings), useCallback(() => {
    setTimerSettings((settings) => {
      if (settings) return false
      setView('root')
      return settings
    })
  }, []))

  return (
    <>
        <button
          type="button"
          ref={setAnchor}
          onClick={() => setOpen((current) => !current)}
          aria-label={t('Tools')}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            TRIGGER,
            'w-11 sm:w-9',
            // Only below `sm`, where the timer has no button of its own.
            running && 'max-sm:w-auto max-sm:min-w-[5.4rem] max-sm:bg-inset max-sm:px-2.5 max-sm:text-ink',
            open && 'bg-inset text-ink',
          )}
        >
          <span className="relative inline-flex">
            <Icon icon={SlidersHorizontal} size={18} strokeWidth={2.1} />
            {active && <span className="absolute -end-1 -top-1 size-1.5 rounded-full bg-primary ring-2 ring-paper sm:hidden" />}
          </span>
          {running && (
            <span className="tnum font-mono text-[12px] font-semibold tracking-[-0.02em] text-ink sm:hidden" aria-hidden>
              {engine.timeLabel}
            </span>
          )}
        </button>

      {open && (
        <Popover
          anchor={anchor}
          onClose={close}
          placement="bottom-end"
          label={t('Tools')}
          focusKey={`${view}:${timerSettings}`}
          className="w-[min(20rem,calc(100vw-1rem))]"
        >
          {view === 'pomodoro' && engine ? (
            <>
              <PanelHead
                title={timerSettings ? t('Timer settings') : t('Focus timer')}
                hint={timerSettings ? t('Make the blocks fit how you study.') : t('Work in calm, deliberate blocks.')}
                onBack={() => (timerSettings ? setTimerSettings(false) : setView('root'))}
                action={!timerSettings ? (
                  <button
                    type="button"
                    onClick={() => setTimerSettings(true)}
                    aria-label={t('Timer settings')}
                    className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-primary)] sm:size-9"
                  >
                    <Icon icon={Settings} size={16} />
                  </button>
                ) : undefined}
              />
              <PomodoroPanel engine={engine} settingsOpen={timerSettings} />
            </>
          ) : view === 'audio' ? (
            <>
              <PanelHead
                title={t('Focus sounds')}
                hint={t('Generated on your device · no streaming')}
                onBack={() => setView('root')}
              />
              <FocusAudioPanel />
            </>
          ) : (
            <>
              <PanelHead title={t('Tools')} hint={t('Find anything, or give the page the whole screen.')} />
              <div className="p-1.5">
                {/* Search is a row rather than a field in the bar: the palette
                    it opens is the field, and the bar was giving width to a
                    box nobody typed into. ⌘K still works from anywhere. */}
                <button
                  type="button"
                  className={ROW}
                  onClick={() => { close(); onOpenSearch() }}
                  aria-keyshortcuts="Meta+K Control+K"
                >
                  <RowIcon icon={Search} />
                  <span className="min-w-0 flex-1 text-[13px] font-medium text-ink">{t('Search')}</span>
                  <Kbd>⌘K</Kbd>
                </button>

                {engine && (
                  <button type="button" className={cn(ROW, 'sm:hidden')} onClick={() => setView('pomodoro')} aria-haspopup="dialog">
                    <RowIcon icon={TimerReset} />
                    <span className="min-w-0 flex-1 text-[13px] font-medium text-ink">{t('Pomodoro')}</span>
                    {running
                      ? <Badge tone="primary" dot><span className="tnum font-mono">{engine.timeLabel}</span></Badge>
                      : <span className="text-[12px] text-ink-3">{t(engine.modeLabel)}</span>}
                    <Icon icon={ChevronRight} size={15} className="shrink-0 text-ink-3 rtl:-scale-x-100" />
                  </button>
                )}

                {audioPlaying !== undefined && (
                  <button type="button" className={cn(ROW, 'sm:hidden')} onClick={() => setView('audio')} aria-haspopup="dialog">
                    <RowIcon icon={AudioLines} />
                    <span className="min-w-0 flex-1 text-[13px] font-medium text-ink">{t('Focus audio')}</span>
                    {audioPlaying
                      ? <Badge tone="primary" dot>{t('Playing')}</Badge>
                      : <span className="text-[12px] text-ink-3">{t('Not playing')}</span>}
                    <Icon icon={ChevronRight} size={15} className="shrink-0 text-ink-3 rtl:-scale-x-100" />
                  </button>
                )}

                {fullscreenSupported && (
                  <button
                    type="button"
                    className={ROW}
                    aria-pressed={isFullscreen}
                    onClick={() => { toggleFullscreen(); close() }}
                  >
                    <RowIcon icon={isFullscreen ? Minimize : Maximize} />
                    <span className="min-w-0 flex-1 text-[13px] font-medium text-ink">{isFullscreen ? t('Exit fullscreen') : t('Fullscreen')}</span>
                  </button>
                )}

                <div className={cn(ROW, 'hover:bg-transparent')}>
                  <RowIcon icon={Maximize2} />
                  <span className="min-w-0 flex-1 text-[13px] font-medium text-ink">{t('Hide menus')}</span>
                  <Toggle checked={focusMode} onChange={onToggleFocusMode} label={t('Hide menus')} />
                </div>
              </div>
            </>
          )}
        </Popover>
      )}
    </>
  )
}

function StudentTools({ focusMode, onToggleFocusMode, onOpenSearch, beforeMenu }: { focusMode: boolean; onToggleFocusMode: () => void; onOpenSearch: () => void; beforeMenu?: ReactNode }) {
  const t = useT()
  // One engine for the whole student app: the top-bar button, the phone row,
  // the panel and the study room's "Start focus timer" all read the same clock
  // from PomodoroProvider (mounted for the student portal in AppShell).
  const engine = usePomodoro()!
  const { playing } = useFocusAudio()
  return (
    <>
      <PomodoroButton engine={engine} className="max-sm:hidden" />
      <AudioButton playing={playing} className="max-sm:hidden" />
      {beforeMenu}
      <ToolsMenu
        focusMode={focusMode}
        onToggleFocusMode={onToggleFocusMode}
        onOpenSearch={onOpenSearch}
        engine={engine}
        audioPlaying={playing}
      />
      <span className="sr-only" aria-live="polite">
        {t(engine.modeLabel)}, {Math.round(engine.progress * 100)}%
      </span>
    </>
  )
}

export function TopbarTools({
  portal,
  focusMode,
  onToggleFocusMode,
  onOpenSearch,
  beforeMenu,
}: {
  portal: Portal
  focusMode: boolean
  onToggleFocusMode: () => void
  onOpenSearch: () => void
  /** Rendered immediately before the Tools trigger — the student's daily question. */
  beforeMenu?: ReactNode
}) {
  return portal === 'student'
    ? <StudentTools focusMode={focusMode} onToggleFocusMode={onToggleFocusMode} onOpenSearch={onOpenSearch} beforeMenu={beforeMenu} />
    : <>{beforeMenu}<ToolsMenu focusMode={focusMode} onToggleFocusMode={onToggleFocusMode} onOpenSearch={onOpenSearch} /></>
}

/**
 * Who you are and how you leave: the portal switch and sign out used to be two
 * more controls in the bar, and one of them was an icon with no name on it.
 */
export function TopbarAccount({ portal, canSwitchPortal }: { portal: Portal; canSwitchPortal: boolean }) {
  const t = useT()
  const identity = useIdentity()
  const avatar = useAvatar()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const universityName = useUniversityName(identity.audience.universityId)
  const roleLabel = t(ROLE_LABEL[identity.role as EffectiveRole] ?? 'Team')
  const detail = portal === 'admin'
    ? roleLabel
    : [universityName, identity.audience.year].filter(Boolean).join(' · ') || t('Medicine')
  const other = portal === 'admin' ? '/app' : '/admin'
  const otherLabel = portal === 'admin' ? t('Student app') : t('Admin console')
  const accountHref = portal === 'admin'
    ? (identity.tabs.includes('settings') ? '/admin/settings' : '/admin')
    : '/app/account'

  const item = 'flex min-h-11 w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-primary)]'

  return (
    <>
        <button
          type="button"
          ref={setAnchor}
          onClick={() => setOpen((current) => !current)}
          aria-label={t('Account')}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(TRIGGER, 'w-11 sm:w-9', open && 'bg-inset')}
        >
          <Avatar name={identity.displayName} size="sm" src={avatar.src} />
        </button>

      {open && (
        <Popover
          anchor={anchor}
          onClose={close}
          placement="bottom-end"
          label={t('Account')}
          className="w-[min(17rem,calc(100vw-1rem))]"
        >
          <div className="flex items-center gap-2.5 border-b border-line px-3 py-3">
            <Avatar name={identity.displayName} size="md" src={avatar.src} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-semibold text-ink">{identity.displayName}</span>
              <span className="mt-0.5 block truncate text-[11.5px] text-ink-3">{detail}</span>
            </span>
          </div>
          <div className="p-1.5">
            {canSwitchPortal && (
              <Link to={other} className={item} onClick={close}>
                <Icon icon={ArrowLeftRight} size={16} className="text-ink-3" />
                {otherLabel}
              </Link>
            )}
            <Link to={accountHref} className={item} onClick={close}>
              <Icon icon={UserRound} size={16} className="text-ink-3" />
              {t('Account')}
            </Link>
            <Link to="/logout" className={item} onClick={close}>
              <Icon icon={LogOut} size={16} className="text-ink-3" />
              {t('Sign out')}
            </Link>
          </div>
        </Popover>
      )}
    </>
  )
}
