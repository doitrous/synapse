import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './roomDock.css'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, ExternalLink, LogOut, Mic, MicOff, Volume2, Pause, Play, Coffee, Hand, BookOpen, Layers, Brain } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { usePomodoro } from '@/components/shell/PomodoroTimer'

/** First letters of the first two words — the hall's own initials, kept in step. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  return (parts[0]![0]! + (parts[1]?.[0] ?? '')).toUpperCase()
}

/**
 * The floating study-room dock.
 *
 * The one persistent view of the room the student is in: it rides along on
 * every page so that joining a room is not the same as being trapped on the
 * Study Rooms page. It draws nothing when there is no room, and steps aside
 * while the full hall is on screen — the page is the better view of its own
 * room. Everything it shows and every control it offers reads from the one
 * live session in `RoomSessionProvider`, so the dock and the hall never
 * disagree about who is here or whether the microphone is open.
 *
 * `railed` / `focusMode` come from the shell so the desktop card clears the
 * sidebar whatever width it is; on mobile the sidebar is a drawer and the bar
 * simply spans the screen above the home indicator.
 */
export function RoomDock({railed,focusMode}: { railed: boolean; focusMode: boolean }) {
  const t = useT()
  const navigate = useNavigate()
  const identity = useIdentity()
  const session = useRoomSession()
  const timer = usePomodoro()
  const startTimer = () => { if (!timer) return; if (!timer.running && timer.current.mode !== 'focus') timer.selectMode('focus'); timer.startPause() }

  const dockRef=useRef<HTMLElement>(null)
  const [dockHeight,setDockHeight]=useState(82)
  const visible=Boolean(session?.room&&!session.viewingFull)
  useEffect(()=>{
    if(!visible||!dockRef.current)return
    const observer=new ResizeObserver(([entry])=>setDockHeight(entry.target.getBoundingClientRect().height))
    observer.observe(dockRef.current)
    return()=>observer.disconnect()
  },[visible])

  if (!session || !session.room || session.viewingFull) return null

  const { room, channel, audio, leave, dockExpanded, setDockExpanded } = session
  const selfId = identity.userId ?? 'self'
  const name = room.roomName || t('Study room')
  const members = channel?.members ?? null
  const seated = members?.length ?? null
  const speakingIds = audio?.speaking ?? new Set<string>()
  const someoneElseSpeaking = [...speakingIds].some((id) => id !== selfId)

  const inVoice = Boolean(audio?.callActive)
  const reconnecting = Boolean(audio?.voiceReconnecting)
  const canVoice = Boolean(audio) && audio!.state !== 'unsupported'
  const voiceUnavailable = Boolean(audio?.reason) && !inVoice && !reconnecting


  const dot = reconnecting
    ? 'bg-warning'
    : inVoice
      ? 'bg-success'
      : 'bg-ink-3'
  const dotRing = reconnecting
    ? 'shadow-[0_0_0_3px_var(--color-warning-tint)]'
    : inVoice
      ? 'shadow-[0_0_0_3px_var(--color-success-tint)]'
      : 'shadow-[0_0_0_3px_var(--color-inset)]'

  const openRoom = () => navigate(`/app/study-rooms?room=${encodeURIComponent(room.roomCode)}`)

  const iconBtn = 'grid size-9 place-items-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]'

  const avatars = (members ?? []).slice(0, 4)

  return (<>
    <div aria-hidden="true" className="room-companion-clearance" style={{height:dockHeight+24}}/>
    <section
      ref={dockRef}
      aria-label={t('Study room')}
      className="room-companion-popup"
      style={{'--room-sidebar-offset':focusMode?'0px':railed?'var(--spacing-sidebar-collapsed)':'var(--spacing-sidebar)'} as CSSProperties}

    >
      <div className="rounded-2xl border border-line bg-surface shadow-pop">
        {/* ── The bar (always shown) ─────────────────────────────── */}
        <div className="flex items-center gap-3 p-2.5 sm:p-3">
          <span className={cn('size-2.5 shrink-0 rounded-full', dot, dotRing)} aria-hidden />
          <button
            type="button"
            className="min-w-0 flex-1 text-start"
            onClick={() => setDockExpanded(!dockExpanded)}
            aria-expanded={dockExpanded}
          >
            <span className="block truncate text-[13.5px] font-semibold leading-tight text-ink">{name}</span>
            {session.study.focus.goal && <span className="block truncate text-xs text-ink-2">{session.study.focus.goal}</span>}
            <span className="mt-0.5 block truncate text-[11.5px] text-ink-3">
              {timer && <><span className="font-mono tracking-[0.04em] text-ink-2">{timer.timeLabel}</span> · </>}{t(session.study.focus.status)}
              {reconnecting
                ? <> · <span className="text-warning">{t('Reconnecting voice…')}</span></>
                : someoneElseSpeaking
                  ? <> · <span className="text-primary-strong">{t('Speaking…')}</span></>
                  : seated !== null
                    ? <> · {seated} {t('seated')}{inVoice ? ` · ${t('in voice')}` : ''}</>
                    : inVoice ? <> · {t('in voice')}</> : null}
            </span>
          </button>

          {inVoice && (
            <button
              type="button"
              className={cn(iconBtn, audio!.muted && 'border-primary-line bg-primary-tint text-primary-strong')}
              onClick={audio!.toggleMute}
              aria-pressed={audio!.muted}
              aria-label={audio!.muted ? t('Unmute') : t('Mute')}
              title={audio!.muted ? t('Unmute') : t('Mute')}
            >
              <Icon icon={audio!.muted ? MicOff : Mic} size={17} />
            </button>
          )}

          <button
            type="button"
            className={iconBtn}
            onClick={() => setDockExpanded(!dockExpanded)}
            aria-label={dockExpanded ? t('Collapse') : t('Expand')}
          >
            <Icon icon={dockExpanded ? ChevronDown : ChevronUp} size={17} />
          </button>
        </div>

        <div className="room-companion-shortcuts" role="group" aria-label={t('Room shortcuts')}>
          <button onClick={startTimer} title={t(timer?.running?'Pause focus':'Start focus')} aria-label={t(timer?.running?'Pause focus':'Start focus')}><Icon icon={timer?.running?Pause:Play} size={16}/><span>{t(timer?.running?'Pause':'Focus')}</span></button>
          <button onClick={()=>session.study.setStatus(session.study.focus.status==='On Break'?'Focusing':'On Break')} aria-pressed={session.study.focus.status==='On Break'}><Coffee size={16}/><span>{t('Break')}</span></button>
          <button onClick={()=>session.study.patch({handRaised:!session.study.focus.handRaised})} aria-pressed={session.study.focus.handRaised}><Hand size={16}/><span>{t('Hand')}</span></button>
          <button onClick={openRoom}><ExternalLink size={16}/><span>{t('Room')}</span></button>
        </div>

        {/* ── Expanded: roster + full controls ───────────────────── */}
        {dockExpanded && (
          <div className="border-t border-line p-3">
            {avatars.length > 0 && (
              <div className="mb-3 flex items-center gap-1.5">
                {avatars.map((member) => {
                  const speaking = speakingIds.has(member.userId)
                  const isSelf = member.userId === selfId
                  return (
                    <span
                      key={member.userId}
                      title={member.displayName || t('Student')}
                      className={cn(
                        'grid size-8 place-items-center rounded-full border text-[11px] font-semibold',
                        isSelf ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface-2 text-ink-2',
                        speaking && 'shadow-[0_0_0_2px_var(--color-primary)]',
                      )}
                    >
                      {initials(member.displayName || t('Student'))}
                    </span>
                  )
                })}
                {seated !== null && seated > avatars.length && (
                  <span className="grid size-8 place-items-center rounded-full border border-line bg-surface-2 text-[11px] font-medium text-ink-3">
                    +{seated - avatars.length}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {inVoice ? (
                <>
                  <button
                    type="button"
                    onClick={audio!.toggleMute}
                    aria-pressed={audio!.muted}
                    className={cn(
                      'inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-semibold',
                      audio!.muted
                        ? 'border border-primary-line bg-primary-tint text-primary-strong'
                        : 'bg-primary text-on-primary shadow-action hover:bg-primary-hover',
                    )}
                  >
                    <Icon icon={audio!.muted ? MicOff : Mic} size={15} />
                    {audio!.muted ? t('Unmute') : t('Mute')}
                  </button>
                  <button
                    type="button"
                    onClick={audio!.leave}
                    className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-semibold text-ink-2 hover:bg-inset"
                  >
                    <Icon icon={MicOff} size={15} />
                    {t('Stop microphone')}
                  </button>
                </>
              ) : reconnecting ? (
                <span className="inline-flex h-9 items-center gap-2 px-1 text-[12.5px] text-ink-2">
                  <Icon icon={Volume2} size={15} className="text-ink-3" />
                  {t('Reconnecting voice…')}
                </span>
              ) : voiceUnavailable ? (
                <span className="text-[12px] leading-relaxed text-ink-2">{t(audio!.reason!)}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => void audio?.join()}
                  disabled={!canVoice}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-[13px] font-semibold text-on-primary shadow-action hover:bg-primary-hover disabled:opacity-50"
                >
                  <Icon icon={Mic} size={15} />
                  {t('Join voice')}
                </button>
              )}

              <button
                type="button"
                onClick={leave}
                className="ms-auto inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-semibold text-danger hover:bg-danger-tint"
              >
                <Icon icon={LogOut} size={15} />
                {t('Leave')}
              </button>
            </div>

            <div className="room-companion-study-links" role="group" aria-label={t('Continue studying')}>
              {[{to:'/app/library',label:'Lectures',icon:BookOpen},{to:'/app/flashcards',label:'Flashcards',icon:Layers},{to:'/app/qbank',label:'MCQs',icon:Brain}].map(({to,label,icon:Glyph})=><button key={to} onClick={()=>navigate(to)}><Glyph size={15}/>{t(label)}</button>)}
            </div>
            <button
              type="button"
              onClick={openRoom}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-mist-line bg-mist py-2.5 text-[13px] font-semibold text-accent-strong hover:bg-mist-2"
            >
              {t('Open the room')}
              <Icon icon={ExternalLink} size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  </>)
}
