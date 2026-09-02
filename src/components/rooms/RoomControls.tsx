import { Armchair, Info, LogOut, Mic, MicOff, Volume2 } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { VOICE_TRANSPORT_REASON, type RoomAudio } from '@/lib/rooms/useRoomAudio'
import type { SeatOccupant } from '@/lib/rooms/roomPresence'

/**
 * The controls along the side of the hall: voice, your seat, and the way out.
 *
 * Voice is now a real call — one stream up to the SFU, one down per speaker —
 * but only where there is a server to carry it. Demo mode has none, and a
 * deployment without the SFU has none either, and in both cases the microphone
 * still opens and still shows you your own level. The inset below appears in
 * exactly those cases and says so. It is not decoration and it is not
 * dismissible: a student who talks into a call that reaches nobody has been
 * lied to by the interface, and no amount of polish elsewhere repays that.
 *
 * When the call *is* up, the inset is gone. A standing note saying voice does
 * not work, printed under a working call, is worse than no note at all.
 */
export function RoomControls({
  audio,
  occupants,
  selfId,
  onCustomise,
  onLeave,
  leaveLabel,
}: {
  audio: RoomAudio
  occupants: SeatOccupant[]
  selfId: string
  onCustomise: () => void
  onLeave: () => void
  leaveLabel?: string
}) {
  const t = useT()
  const speaking = occupants.filter((occupant) => occupant.speaking)
  const live = audio.state === 'live'
  // Only a local problem is worth its own line, and only a refusal is a
  // failure: an insecure page or a browser without `getUserMedia` is
  // information, not an error. The transport sentences are the inset's job.
  const localProblem = audio.state === 'error' || audio.state === 'unsupported'
  const transportReason = !audio.callActive && !audio.voiceReconnecting
    ? audio.reason ?? VOICE_TRANSPORT_REASON
    : null
  const localReason = localProblem ? audio.reason : null

  return (
    <Panel className="h-fit">
      <PanelHeader title={t('Room controls')} icon={Volume2} />
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap gap-2">
          {live ? (
            <>
              <Button
                variant={audio.muted ? 'secondary' : 'primary'}
                iconLeft={audio.muted ? MicOff : Mic}
                onClick={audio.toggleMute}
                aria-pressed={audio.muted}
              >
                {audio.muted ? t('Unmute') : t('Mute')}
              </Button>
              <Button variant="ghost" iconLeft={MicOff} onClick={audio.leave}>
                {t('Stop microphone')}
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              iconLeft={Mic}
              loading={audio.state === 'joining'}
              disabled={audio.state === 'unsupported'}
              onClick={() => void audio.join()}
            >
              {t('Join voice')}
            </Button>
          )}
        </div>

        {/* Rendered unconditionally so the live region exists before it has
            anything to say: a `role="status"` inserted together with its text is
            frequently never announced. */}
        <p
          role="status"
          className={cn(
            'text-[12.5px] leading-relaxed',
            audio.state === 'error' ? 'text-danger' : 'text-ink-2',
          )}
        >
          {localReason && localReason !== transportReason ? t(localReason) : ''}
        </p>

        {/*
          The honest inset, shown only while it is true. It is not an error
          state and it is not dismissible: it is the shape of the feature on
          this deployment, and it stays on screen for as long as that is so.
        */}
        {transportReason && (
          <div className="flex gap-2.5 rounded-lg border border-mist-line bg-mist p-3">
            <Icon icon={Info} size={15} className="mt-0.5 text-ink-3" />
            <p className="text-[12px] leading-relaxed text-ink-2">
              <span className="font-medium text-ink">{t(transportReason)}</span>{' '}
              {t('Joining voice opens your own microphone so you can see your level and test your mute button. Nobody else can hear you, and you cannot hear anyone in this room.')}
            </p>
          </div>
        )}

        {audio.voiceReconnecting ? (
          /* The connection dropped mid-conversation. The call is being rebuilt
             from the microphone that is still open, so the honest thing is
             "wait", not "voice is unavailable" and not silence. */
          <p role="status" className="flex items-center gap-2 text-[12.5px] text-ink-2">
            <Icon icon={Volume2} size={14} className="text-ink-3" />
            {t('Reconnecting voice…')}
          </p>
        ) : audio.callActive ? (
          <p className="flex items-center gap-2 text-[12.5px] text-ink-2">
            <Icon icon={Volume2} size={14} className="text-accent-strong" />
            {t('You are in the room\u2019s voice. Everyone here can hear you unless you mute.')}
          </p>
        ) : null}

        <div>
          <p className="mb-1.5 text-[13px] font-semibold text-ink">
            {t('Speaking now')}
          </p>
          {speaking.length === 0 ? (
            <p className="text-[12.5px] text-ink-3">{t('Nobody is speaking.')}</p>
          ) : (
            <ul className="space-y-1">
              {speaking.map((occupant) => (
                <li key={occupant.id} className="flex items-center gap-2 text-[13px] text-ink">
                  <Icon icon={Volume2} size={14} className="text-accent-strong" />
                  <span className="min-w-0 flex-1 truncate">{occupant.name}</span>
                  {occupant.id === selfId && <Badge tone="outline">{t('You')}</Badge>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*
          The room in a list. The hall says who is studying with a moving arm
          and who is speaking with a blue ring — motion and colour, both of
          which some readers will not get, and neither of which survives a
          phone where the desks are 60 pixels wide. This is the same fact in
          words, and it is not an accessibility afterthought bolted below the
          fold: it is where you look to see who is actually here.
        */}
        <div>
          <p className="mb-1.5 text-[13px] font-semibold text-ink">
            {t('In the room')}
          </p>
          <ul className="divide-y divide-line rounded-lg border border-line">
            {occupants.map((occupant) => (
              <li key={occupant.id} className="flex items-center gap-2 px-3 py-2 text-[13px]">
                <span className="min-w-0 flex-1 truncate text-ink">
                  {occupant.name}
                  {occupant.id === selfId && <span className="text-ink-3"> · {t('you')}</span>}
                </span>
                <span className="shrink-0 text-[12px] text-ink-2">
                  {occupant.speaking ? t('Speaking') : occupant.studying ? t('Studying') : t('Idle')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line pt-4">
          <Button variant="secondary" iconLeft={Armchair} onClick={onCustomise}>
            {t('Customise your seat')}
          </Button>
          <Button variant="ghost" iconLeft={LogOut} onClick={onLeave}>
            {leaveLabel ?? t('Leave room')}
          </Button>
        </div>
      </div>
    </Panel>
  )
}
