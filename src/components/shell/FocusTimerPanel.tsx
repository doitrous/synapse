import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  AudioLines, ChevronDown, Hammer, ListChecks, Maximize, Minimize, Pause, Play, Plus, RotateCcw, ShieldAlert,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { TextInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { AsyncSurface } from '@/components/ui/AsyncSurface'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { MaristanaModel } from '@/components/maristanas/MaristanaModel'
import { FocusAudioPanel, useFocusAudio } from './FocusAudioPlayer'
import { useImmersion } from './ImmersionContext'
import type { FocusSessionEngine } from '@/lib/useFocusSession'
import { DURATION_PRESETS_MINUTES, MAX_DURATION_MINUTES, MIN_DURATION_MINUTES, formatClock } from '@/lib/focusSession'
import { openTasks } from '@/data/tasks'
import { useTasks } from '@/lib/useTasks'
import { useMaristanas } from '@/lib/useMaristanas'
import { useFullscreen } from '@/lib/useFullscreen'
import { isTopOverlay, popOverlay, pushOverlay } from '@/lib/overlayStack'
import { focusFirstWithin, wrapTab } from '@/lib/focusTrap'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const HEAD_ICON_BTN =
  'inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-transparent text-ink-2 transition-colors hover:border-line hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:size-9'

function AddTaskInline({ onAdd }: { onAdd: (title: string) => void }) {
  const t = useT()
  const [title, setTitle] = useState('')
  return (
    <form
      className="mt-4 flex items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = title.trim()
        if (!trimmed) return
        onAdd(trimmed)
        setTitle('')
      }}
    >
      <TextInput value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('New task')} aria-label={t('New task')} />
      <Button type="submit" iconLeft={Plus} variant="secondary">{t('Add')}</Button>
    </form>
  )
}

/** The build-a-bimaristan entry point: a compact live view of the active
 *  hospital, reusing the exact model and data the full page shows. Crediting
 *  itself is not gated on this being open — `useFocusSession`'s heartbeat runs
 *  the whole time the block is running, the same way every other study
 *  surface already credits time. This is only where the student can *watch*
 *  it, and jump to the full page if they want it. */
function BimaristanButton({ strictBlocking }: { strictBlocking: boolean }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const { data, loading, error } = useMaristanas()
  const active = data?.hospitals.find((hospital) => hospital.active) ?? data?.hospitals.at(-1)

  const guardNavigate = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (strictBlocking && !window.confirm(t('Leaving now discards this focus session. Continue?'))) {
      event.preventDefault()
      return
    }
    close()
  }, [close, strictBlocking, t])

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onClick={() => setOpen((current) => !current)}
        aria-label={t('Build a bimaristan')}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(HEAD_ICON_BTN, open && 'bg-inset text-ink')}
      >
        <Icon icon={Hammer} size={18} strokeWidth={2.1} />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} placement="bottom-end" label={t('Build Maristanas')} className="w-[min(19rem,calc(100vw-1rem))]">
          <div className="border-b border-line px-3 py-2.5">
            <p className="text-[13.5px] font-semibold text-ink">{t('Build Maristanas')}</p>
            <p className="mt-0.5 text-[10.5px] text-ink-3">{t('This session already counts toward it.')}</p>
          </div>
          <AsyncSurface loading={loading && !data} error={error ? <EmptyState className="px-4 py-8" icon={Hammer} title={t('Unavailable right now')} /> : undefined}>
            {active ? (
              <div className="p-3">
                <div className="overflow-hidden rounded-lg border border-line">
                  <MaristanaModel stage={active.stage} name={active.name} compact />
                  <div className="border-t border-line bg-surface-2/40 px-3 py-2.5">
                    <p className="truncate text-[12.5px] font-semibold text-ink">{active.name}</p>
                    <p className="mt-0.5 text-[10.5px] text-ink-3">{t('{n} of 25 parts placed').replace('{n}', String(active.stage))}</p>
                  </div>
                </div>
                <ButtonLink to="/app/maristanas" variant="secondary" size="sm" className="mt-3 w-full justify-center" onClick={guardNavigate}>
                  {t('Open Build Maristanas')}
                </ButtonLink>
              </div>
            ) : (
              <EmptyState className="px-4 py-8" icon={Hammer} title={t('Nothing built yet')} description={t('Study time from this session will start it.')} />
            )}
          </AsyncSurface>
        </Popover>
      )}
    </>
  )
}

function MusicButton() {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const { playing } = useFocusAudio()
  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onClick={() => setOpen((current) => !current)}
        aria-label={t('Focus audio')}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(HEAD_ICON_BTN, open && 'bg-inset text-ink')}
      >
        <span className="relative inline-flex">
          <Icon icon={AudioLines} size={18} strokeWidth={2.1} />
          {playing && <span className="absolute -end-1 -top-1 size-1.5 rounded-full bg-primary ring-2 ring-paper" />}
        </span>
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} placement="bottom-end" label={t('Focus sounds')} className="w-[min(20rem,calc(100vw-1rem))]">
          <div className="border-b border-line px-3 py-2.5">
            <p className="text-[13.5px] font-semibold text-ink">{t('Focus sounds')}</p>
            <p className="mt-0.5 text-[10.5px] text-ink-3">{t('Generated on your device · no streaming')}</p>
          </div>
          <FocusAudioPanel />
        </Popover>
      )}
    </>
  )
}

/**
 * The dedicated Focus Timer surface: a panel that slides up from the bottom
 * to fill the screen, and retracts the same way it arrived. It is deliberately
 * not a route — it opens over whatever the student was already looking at,
 * from a trigger the shell keeps mounted regardless of page.
 */
export function FocusTimerPanel({ engine, onClose }: { engine: FocusSessionEngine; onClose: () => void }) {
  const t = useT()
  const id = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const tasks = useTasks()
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
  const { setImmersive } = useImmersion()
  const [immersiveFallback, setImmersiveFallback] = useState(false)
  const [customMinutes, setCustomMinutes] = useState('')
  const { state, accruedSeconds, strictWarningSecondsLeft } = engine
  const strictBlocking = state.strictArmed && state.running
  const openTaskList = openTasks(tasks.doc)
  const selectedTask = openTaskList.find((task) => task.id === state.selectedTaskId) ?? null
  const fullscreenSupported = typeof document !== 'undefined' && document.fullscreenEnabled
  const fullscreenEngaged = fullscreenSupported ? isFullscreen : immersiveFallback

  const attemptClose = useCallback(() => {
    if (strictBlocking && !window.confirm(t('Leaving now discards this focus session. Continue?'))) return
    if (strictBlocking) engine.discard()
    if (document.fullscreenElement) void document.exitFullscreen()
    if (immersiveFallback) { setImmersive(false); setImmersiveFallback(false) }
    onClose()
  }, [engine, immersiveFallback, onClose, setImmersive, strictBlocking, t])

  const toggleReallyFullscreen = useCallback(() => {
    if (fullscreenSupported) { toggleFullscreen(); return }
    setImmersiveFallback((current) => {
      const next = !current
      setImmersive(next)
      return next
    })
  }, [fullscreenSupported, setImmersive, toggleFullscreen])

  useEffect(() => {
    pushOverlay(id, 'dialog')
    const previous = document.activeElement as HTMLElement | null
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    focusFirstWithin(panelRef.current)

    const onKey = (event: KeyboardEvent) => {
      if (!isTopOverlay(id)) return
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        attemptClose()
        return
      }
      wrapTab(event, panelRef.current)
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      popOverlay(id)
      document.body.style.overflow = bodyOverflow
      previous?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const applyCustomMinutes = useCallback(() => {
    const value = Number(customMinutes)
    if (Number.isFinite(value) && value > 0) engine.setDurationMinutes(value)
    setCustomMinutes('')
  }, [customMinutes, engine])

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('Focus timer')}
      tabIndex={-1}
      className="animate-slide-up fixed inset-0 z-[90] flex flex-col bg-paper focus:outline-none"
    >
      <header className="flex items-center justify-between border-b border-line px-3 py-2.5 pt-[calc(env(safe-area-inset-top)+0.625rem)] sm:px-5">
        <button
          type="button"
          onClick={attemptClose}
          aria-label={t('Close focus timer')}
          className={HEAD_ICON_BTN}
        >
          <Icon icon={ChevronDown} size={20} strokeWidth={2.1} />
        </button>
        <p className="text-[13px] font-semibold text-ink">{t('Focus Timer')}</p>
        <div className="flex items-center gap-1">
          <MusicButton />
          <button
            type="button"
            onClick={toggleReallyFullscreen}
            aria-label={fullscreenEngaged ? t('Exit fullscreen') : t('Fullscreen')}
            aria-pressed={fullscreenEngaged}
            className={cn(HEAD_ICON_BTN, fullscreenEngaged && 'bg-inset text-ink')}
          >
            <Icon icon={fullscreenEngaged ? Minimize : Maximize} size={18} strokeWidth={2.1} />
          </button>
          <BimaristanButton strictBlocking={strictBlocking} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-surface-2/65 p-1">
            <button
              type="button"
              disabled={state.running}
              aria-pressed={state.mode === 'countdown'}
              onClick={() => engine.setMode('countdown')}
              className={cn(
                'min-h-11 rounded-md text-[12.5px] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 sm:min-h-9',
                state.mode === 'countdown' ? 'bg-surface text-ink shadow-control' : 'text-ink-3 hover:text-ink',
              )}
            >
              {t('Countdown')}
            </button>
            <button
              type="button"
              disabled={state.running}
              aria-pressed={state.mode === 'countup'}
              onClick={() => engine.setMode('countup')}
              className={cn(
                'min-h-11 rounded-md text-[12.5px] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 sm:min-h-9',
                state.mode === 'countup' ? 'bg-surface text-ink shadow-control' : 'text-ink-3 hover:text-ink',
              )}
            >
              {t('Count up')}
            </button>
          </div>

          {state.mode === 'countdown' && (
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {DURATION_PRESETS_MINUTES.map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  disabled={state.running}
                  aria-pressed={state.durationSeconds === minutes * 60}
                  onClick={() => engine.setDurationMinutes(minutes)}
                  className={cn(
                    'min-h-11 rounded-md border px-3 text-[12.5px] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 sm:min-h-9',
                    state.durationSeconds === minutes * 60 ? 'border-transparent bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset hover:text-ink',
                  )}
                >
                  {minutes}{t('m')}
                </button>
              ))}
              <TextInput
                type="number"
                inputMode="numeric"
                min={MIN_DURATION_MINUTES}
                max={MAX_DURATION_MINUTES}
                disabled={state.running}
                value={customMinutes}
                onChange={(event) => setCustomMinutes(event.target.value)}
                onBlur={applyCustomMinutes}
                onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); applyCustomMinutes() } }}
                placeholder={t('Custom')}
                aria-label={t('Custom minutes')}
                className="h-11 w-20 text-center sm:h-9"
              />
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="tnum font-mono text-[56px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[64px]">
              {formatClock(state.mode === 'countdown' ? state.remainingSeconds : state.elapsedSeconds)}
            </p>
            {state.mode === 'countdown' && (
              <div className="mx-auto mt-5 h-1.5 max-w-xs overflow-hidden rounded-full bg-inset">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
                  style={{ width: `${(accruedSeconds / Math.max(1, state.durationSeconds)) * 100}%` }}
                />
              </div>
            )}
            {state.mode === 'countdown' && state.remainingSeconds === 0 && !state.running && (
              <p className="mt-3 text-[12.5px] font-medium text-success">{t('Block complete — nice work.')}</p>
            )}
          </div>

          <div className="mt-8">
            {openTaskList.length === 0 ? (
              <EmptyState
                icon={ListChecks}
                title={t('No tasks yet')}
                description={t('Add one to focus on this session.')}
                action={<AddTaskInline onAdd={(title) => engine.selectTask(tasks.addTask({ title }))} />}
              />
            ) : (
              <div>
                <p className="mb-1.5 text-[12px] font-medium text-ink-2">{t('Focusing on')}</p>
                <div className="relative">
                  <select
                    value={state.selectedTaskId ?? ''}
                    onChange={(event) => engine.selectTask(event.target.value || null)}
                    aria-label={t('Focusing on')}
                    className="h-11 w-full appearance-none rounded-md border border-line bg-surface px-3 text-[13.5px] text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] sm:h-9"
                  >
                    <option value="">{t('No task — just focus')}</option>
                    {openTaskList.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}
                  </select>
                </div>
                {!selectedTask && <AddTaskInline onAdd={(title) => engine.selectTask(tasks.addTask({ title }))} />}
              </div>
            )}
          </div>

          <label className="mt-6 flex items-center justify-between gap-3 rounded-lg bg-surface-2/65 px-3 py-2.5">
            <span className="flex items-center gap-2">
              <Icon icon={ShieldAlert} size={15} className="text-ink-3" />
              <span>
                <span className="block text-[12.5px] font-medium text-ink">{t('Strict mode')}</span>
                <span className="mt-0.5 block text-[10.5px] text-ink-3">{t('Leaving this tab discards the running block within 15s.')}</span>
              </span>
            </span>
            <Toggle checked={state.strictArmed} onChange={engine.setStrictArmed} label={t('Strict mode')} />
          </label>

          <div className="mt-8 flex items-center justify-center gap-3">
            <IconButton icon={RotateCcw} label={t('Reset')} onClick={engine.reset} />
            <button
              type="button"
              onClick={engine.toggleRunning}
              aria-label={state.running ? t('Pause') : t('Start')}
              className="inline-flex size-16 items-center justify-center rounded-full border border-primary-strong/25 bg-primary text-on-primary shadow-action transition-[background-color,transform] hover:bg-primary-hover active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon icon={state.running ? Pause : Play} size={26} strokeWidth={2.1} />
            </button>
            <div className="size-11 sm:size-9" aria-hidden />
          </div>
        </div>
      </div>

      {strictWarningSecondsLeft != null && (
        <div role="alert" className="animate-pop fixed inset-x-3 bottom-3 z-[95] rounded-xl border border-danger/30 bg-danger-tint px-4 py-3 text-center shadow-pop sm:inset-x-auto sm:start-1/2 sm:w-[26rem] sm:-translate-x-1/2">
          <p className="text-[13px] font-semibold text-danger">
            {t('Come back within {n}s or this session is discarded.').replace('{n}', String(strictWarningSecondsLeft))}
          </p>
        </div>
      )}
    </div>,
    document.body,
  )
}
