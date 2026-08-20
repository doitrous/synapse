import { useState } from 'react'
import { Users, Hash, Copy, Check, ArrowLeft, Play, Clock, Trophy } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Toggle } from '@/components/ui/Toggle'
import { PARTY_REFUSALS, useParty, usePartyActions, usePartySessions, type PartySessionSummary } from '@/lib/useParties'
import { formatDateTime, formatRelativeTime } from '@/lib/format'
import { useT } from '@/lib/i18n'

function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
}

function SessionRow({ session, t }: { session: PartySessionSummary; t: (s: string) => string }) {
  const when =
    session.state === 'scheduled' && session.startsAt
      ? `${t('Opens')} ${formatDateTime(new Date(session.startsAt))}`
      : session.state === 'closed' && session.closedAt
        ? `${t('Closed')} ${formatRelativeTime(session.closedAt)}`
        : null

  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-medium text-ink">{session.name}</span>
        <span className="mt-0.5 block text-[12px] text-ink-3">
          {session.itemCount} {t('items')}{when ? ` · ${when}` : ''}
        </span>
      </span>
      {session.isMine && <Badge tone="outline">{t('Yours')}</Badge>}
    </li>
  )
}

/**
 * One party: its name, its members, its one permanent link, the visibility
 * switch for the host, and its sessions grouped by what state they are in.
 *
 * Sitting a session (`PartySessionRunner`) is a later slice — this page only
 * shows what exists, it does not run anything yet.
 */
export function PartyPage({ partyId, onExit }: { partyId: string; onExit: () => void }) {
  const t = useT()
  const { party, error, reload } = useParty(partyId)
  const { sessions } = usePartySessions(partyId)
  const { setVisibility } = usePartyActions()
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  if (error) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{error}</p>
        <Button className="mt-4" variant="secondary" iconLeft={ArrowLeft} onClick={onExit}>{t('Back to parties')}</Button>
      </Panel>
    )
  }

  if (!party) {
    return <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading the party…')}</Panel>
  }

  // The code is the whole mechanism — carrying it as a query param just saves
  // a recipient from having to find "Join with a link" and paste it in by hand.
  const link = `${window.location.origin}/app/study-together?party=${party.code}`

  async function toggleVisibility(nextOpen: boolean) {
    setBusy(true)
    setMessage('')
    const result = await setVisibility(party!.id, nextOpen ? 'open' : 'invite')
    setBusy(false)
    if (!result.ok) setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t))
    else void reload()
  }

  const running = sessions.filter((session) => session.state === 'open')
  const scheduled = sessions.filter((session) => session.state === 'scheduled')
  const finished = sessions.filter((session) => session.state === 'closed')

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
      <div className="space-y-4">
        <Panel>
          <PanelHeader
            title={party.name}
            icon={Hash}
            action={<Button variant="ghost" size="sm" iconLeft={ArrowLeft} onClick={onExit}>{t('Back')}</Button>}
          />
          <div className="space-y-4 p-5">
            <div>
              <p className="text-[12.5px] text-ink-3">{t('Share this link so others can join')}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="min-w-0 flex-1 truncate rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-[12.5px] text-ink">{link}</span>
                <Button
                  variant="secondary"
                  iconLeft={copied ? Check : Copy}
                  onClick={() => { void navigator.clipboard?.writeText(link); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }}
                >
                  {copied ? t('Copied') : t('Copy link')}
                </Button>
              </div>
            </div>

            {party.isHost && (
              <div className="space-y-2 border-t border-line pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium text-ink">
                      {party.visibility === 'open' ? t('Open to your year') : t('Invite only')}
                    </span>
                    <span className="mt-0.5 block max-w-md text-[12px] leading-relaxed text-ink-3">
                      {party.visibility === 'open'
                        ? t('Anyone in your university and year can find this party and join it.')
                        : t('It appears in no list. Anyone with the link can still join.')}
                    </span>
                  </span>
                  <Toggle
                    checked={party.visibility === 'open'}
                    onChange={(next) => void toggleVisibility(next)}
                    label={t('Open to your year')}
                  />
                </div>
                {busy && <p className="text-[12px] text-ink-3">{t('Saving…')}</p>}
                {message && <p role="status" className="text-[12.5px] text-danger">{message}</p>}
              </div>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title={t('Running now')} icon={Play} hint={running.length ? String(running.length) : undefined} />
          {running.length === 0 ? (
            <p className="px-5 py-6 text-center text-[12.5px] text-ink-3">{t('Nothing running right now.')}</p>
          ) : (
            <ul className="divide-y divide-line">
              {running.map((session) => <SessionRow key={session.id} session={session} t={t} />)}
            </ul>
          )}
        </Panel>

        {scheduled.length > 0 && (
          <Panel>
            <PanelHeader title={t('Scheduled')} icon={Clock} hint={String(scheduled.length)} />
            <ul className="divide-y divide-line">
              {scheduled.map((session) => <SessionRow key={session.id} session={session} t={t} />)}
            </ul>
          </Panel>
        )}

        {finished.length > 0 && (
          <Panel>
            <PanelHeader title={t('Finished')} icon={Trophy} hint={String(finished.length)} />
            <ul className="divide-y divide-line">
              {finished.map((session) => <SessionRow key={session.id} session={session} t={t} />)}
            </ul>
          </Panel>
        )}
      </div>

      <Panel className="h-fit">
        <PanelHeader title={t('Who is in')} icon={Users} hint={`${party.members.length} ${party.members.length === 1 ? t('person') : t('people')}`} />
        <ul className="divide-y divide-line">
          {party.members.map((member) => (
            <li key={member.userId} className="flex items-center gap-3 px-4 py-2.5">
              <Avatar name={member.displayName} size="sm" />
              <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{member.displayName}</span>
              {member.role === 'host' && <Badge tone="primary">{t('Host')}</Badge>}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
