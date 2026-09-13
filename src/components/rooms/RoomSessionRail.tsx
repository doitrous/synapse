import { useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, ClipboardList, Coffee, Hand, Headphones, HeadphoneOff, LogOut, Mic, MicOff, Target, Volume2 } from 'lucide-react'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { useT } from '@/lib/i18n'
import type { StudyPresence } from '@/lib/rooms/studyWorld'
import { StudentPortrait } from './StudyWorldArt'
import { StudyStatusIcon } from './StudyStatusIcon'
import { StudyTimerButton } from './StudyTimerButton'
import { MyStudySession } from './MyStudySession'

/**
 * The room's right-hand panel, redesigned quiet and single-column.
 *
 * One vertical run, hairline-ruled into four bands the way the rest of the app
 * is: your focus line (goal, status, the shared timer), the voice bar, the one
 * door into shared tests and games, and who is in the room — which now takes the
 * height the embedded chat used to eat, because chat became a floating box over
 * the floor. Raise hand / break / leave sit in the footer, and the fuller focus
 * editor and room management stay one tap away under their disclosures so they
 * never crowd the people you came to sit with.
 */
export function RoomSessionRail({
  demo, people, onOpenMember, reminder, onReminder, onCustomise, shared, onLeaveRoom, onStudyTogether, manage,
}: {
  demo: boolean
  people: StudyPresence[]
  onOpenMember: (id: string) => void
  reminder: string
  onReminder: (value: string) => void
  onCustomise: () => void
  shared: boolean
  onLeaveRoom: () => void
  /** Opens the shared tests & games surface — the room's one collaborative door. */
  onStudyTogether: () => void
  /** Party management (schedule, games, roster) — shown behind a disclosure. */
  manage?: ReactNode
}) {
  const t = useT()
  const session = useRoomSession()!
  const { audio, study } = session
  const focus = study.focus
  const [toolsOpen, setToolsOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const micOn = Boolean(audio?.callActive && !audio.muted)
  const talking = people.filter((person) => person.speaking).length
  const voiceStatus = demo
    ? t('Preview room · voice is not connected')
    : audio?.reason ? t(audio.reason)
    : audio?.callActive ? t(audio.audience === 'table' ? 'Voice connected · only your table hears you' : 'Voice connected · entire room')
    : t('Microphone off · join voice when you are ready')

  return (
    <div className="session-dock">
      {/* Focus line — compact; the timer is the shared menu clock. */}
      <div className="session-focus-strip">
        <label className="session-goal">
          <Target size={15} aria-hidden />
          <input
            value={focus.goal}
            maxLength={120}
            onChange={(event) => study.patch({ goal: event.target.value })}
            placeholder={t('What would make this session a win?')}
            aria-label={t('Your focus')}
          />
        </label>
        <div className="session-focus-row">
          <span className="session-status-pill"><StudyStatusIcon status={focus.status} /><span>{t(focus.status)}</span></span>
          <StudyTimerButton />
        </div>
      </div>

      {/* Voice bar */}
      <div className="session-voice">
        <div className="session-voice-controls" role="group" aria-label={t('Voice')}>
          <button type="button" aria-pressed={micOn} className={audio?.callActive ? (micOn ? 'is-live' : '') : 'is-join'} disabled={demo || audio?.state === 'joining' || audio?.state === 'unsupported'} onClick={() => (audio?.callActive ? audio.toggleMute() : void audio?.join())}>
            {micOn ? <Mic size={17} /> : <MicOff size={17} />}<span>{t(audio?.callActive ? (micOn ? 'Mute' : 'Unmute') : 'Join voice')}</span>
          </button>
          <button type="button" aria-pressed={audio?.deafened ?? false} disabled={demo || !audio?.callActive} onClick={() => audio?.toggleDeafen()} aria-label={t('Deafen')}>
            {audio?.deafened ? <HeadphoneOff size={17} /> : <Headphones size={17} />}
          </button>
          {audio?.callActive && !demo && (
            <button type="button" className="session-voice-leave" onClick={() => audio.leave()} aria-label={t('Leave voice')}><LogOut size={16} /></button>
          )}
        </div>
        <div className="session-audience" role="group" aria-label={t('Speak to')}>
          <span>{t('Speak to')}</span>
          <button type="button" aria-pressed={audio?.audience !== 'table'} onClick={() => audio?.setAudience('room')}>{t('Entire room')}</button>
          <button type="button" aria-pressed={audio?.audience === 'table'} disabled={!shared} onClick={() => audio?.setAudience('table')}>{t('My table')}</button>
        </div>
        <p className="session-voice-status" role="status">{voiceStatus}</p>
      </div>

      {/* Study together — the one door into shared tests and games. */}
      <button type="button" className="session-together" onClick={onStudyTogether}>
        <ClipboardList size={18} className="session-together-icon" />
        <span className="session-together-copy">
          <strong>{t('Study together')}</strong>
          <small>{t('Start a shared test or game')}</small>
        </span>
        <ChevronRight size={16} className="session-together-chevron" />
      </button>

      {/* Who is here / who is talking — takes the height chat used to. */}
      <section className="session-members" aria-label={t('In the room')}>
        <h3>{t('In the room')} · {people.length}{talking > 0 && <span className="session-talking"><Volume2 size={12} /> {talking} {t('talking')}</span>}</h3>
        <ul>
          {people.map((person) => (
            <li key={person.id}>
              <button type="button" onClick={() => onOpenMember(person.id)}>
                <span className={`session-portrait ${person.speaking ? 'is-speaking' : ''}`}><StudentPortrait model={person.personalisation?.model ?? 'man-1'} className="size-9 shrink-0" /></span>
                <span className="session-member-name"><strong>{person.name}</strong><small>{t(person.status ?? 'In the room')}</small></span>
                {person.handRaised ? <Hand size={14} className="session-member-icon" /> : person.speaking ? <Mic size={14} className="session-member-icon is-speaking" /> : person.micMuted ? <MicOff size={14} className="session-member-icon" /> : null}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer: the room-level actions the bottom dock used to carry. */}
      <div className="session-footer">
        <button type="button" className={focus.handRaised ? 'is-active' : ''} aria-pressed={focus.handRaised} onClick={() => study.patch({ handRaised: !focus.handRaised })}>
          <Hand size={16} /><span>{t(focus.handRaised ? 'Lower hand' : 'Raise hand')}</span>
        </button>
        <button type="button" className={focus.status === 'On Break' ? 'is-active' : ''} aria-pressed={focus.status === 'On Break'} onClick={() => study.setStatus(focus.status === 'On Break' ? 'Focusing' : 'On Break')}>
          <Coffee size={16} /><span>{t(focus.status === 'On Break' ? 'Back to focus' : 'Break')}</span>
        </button>
        <button type="button" className="session-leave" onClick={onLeaveRoom}>
          <LogOut size={16} /><span>{t('Leave room')}</span>
        </button>
      </div>

      {/* Full focus editor, tucked away. */}
      <div className="session-tools">
        <button type="button" className="session-tools-toggle" aria-expanded={toolsOpen} onClick={() => setToolsOpen((open) => !open)}>
          <span>{t('Study tools')}</span><ChevronDown size={15} className={toolsOpen ? 'is-open' : ''} />
        </button>
        {toolsOpen && <MyStudySession reminder={reminder} onReminder={onReminder} onCustomise={onCustomise} />}
      </div>

      {manage && (
        <div className="session-tools">
          <button type="button" className="session-tools-toggle" aria-expanded={manageOpen} onClick={() => setManageOpen((open) => !open)}>
            <span>{t('Manage room')}</span><ChevronDown size={15} className={manageOpen ? 'is-open' : ''} />
          </button>
          {manageOpen && <div className="session-manage">{manage}</div>}
        </div>
      )}
    </div>
  )
}
