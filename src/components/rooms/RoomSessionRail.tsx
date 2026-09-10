import { useState, type ReactNode } from 'react'
import { ChevronDown, Coffee, Hand, Headphones, HeadphoneOff, LogOut, Mic, MicOff, Target, Volume2 } from 'lucide-react'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { useT } from '@/lib/i18n'
import type { StudyPresence } from '@/lib/rooms/studyWorld'
import { StudentPortrait } from './StudyWorldArt'
import { StudyStatusIcon } from './StudyStatusIcon'
import { StudyTimerButton } from './StudyTimerButton'
import { MyStudySession } from './MyStudySession'
import { RoomChatBox, type ChatTarget, type RoomMessage } from './RoomChatBox'
import type { LiveChat } from './RoomChatBox'

/**
 * The room's right-hand dock, redesigned chat-forward.
 *
 * Everything a student does while seated lives here in one column: a compact
 * focus line (goal, status, the shared study timer), the voice bar (mic,
 * deafen, who they speak to), who is in the room and who is talking, and the
 * live chat filling the rest. The old bottom control dock, the separate People
 * tab and the floating chat popover all folded into this. The full focus editor
 * (module, reminder, status, study links, desk) is one tap away under "Study
 * tools", collapsed so it never crowds the conversation.
 */
export function RoomSessionRail({
  demo, people, onOpenMember, reminder, onReminder, onCustomise, shared, onLeaveRoom, chat, manage,
}: {
  demo: boolean
  people: StudyPresence[]
  onOpenMember: (id: string) => void
  reminder: string
  onReminder: (value: string) => void
  onCustomise: () => void
  shared: boolean
  onLeaveRoom: () => void
  chat: { name: string; messages: RoomMessage[]; draft: string; onDraft: (t: string) => void; onSend: () => void; target: ChatTarget | null; live: LiveChat | null }
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
          <button type="button" aria-pressed={micOn} className={micOn ? 'is-live' : ''} disabled={demo || audio?.state === 'joining' || audio?.state === 'unsupported'} onClick={() => (audio?.callActive ? audio.toggleMute() : void audio?.join())}>
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

      {/* Who is here / who is talking */}
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

      {/* Chat fills the rest */}
      <div className="session-chat">
        <RoomChatBox embedded demo={demo} name={chat.name} messages={chat.messages} draft={chat.draft} onDraft={chat.onDraft} onSend={chat.onSend} live={chat.live} />
      </div>

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
