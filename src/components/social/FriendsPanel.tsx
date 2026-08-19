import { useState } from 'react'
import { UserPlus, Users, Check, X, Swords, Play, Link2, Copy } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { TextInput } from '@/components/ui/Field'
import type { FriendProfile } from '@/lib/useFriends'
import { useT } from '@/lib/i18n'

/**
 * The link a student sends when there is no directory to search.
 *
 * A university does not have to share a channel for two of its students to
 * become study partners: this works over text, WhatsApp, anything — the link
 * itself carries the invitation.
 */
function InviteLinkPanel({ onCreateInvite }: { onCreateInvite: () => Promise<{ token: string }> }) {
  const t = useT()
  const [link, setLink] = useState<string | null>(null)
  const [minting, setMinting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  async function createInvite() {
    setMinting(true)
    setFailed(false)
    try {
      const result = await onCreateInvite()
      if (result?.token) setLink(`${window.location.origin}/app/study-together?invite=${result.token}`)
    } catch {
      // A dropped request should not leave the button spinning forever —
      // the student needs to know it is safe to try again.
      setFailed(true)
    } finally {
      setMinting(false)
    }
  }

  return (
    <Panel>
      <PanelHeader title={t('Find friends')} icon={Link2} />
      <div className="space-y-3 p-5">
        <p className="text-[12.5px] leading-relaxed text-ink-3">
          {t('No shared university, no directory, no problem. Send this link on any channel — opening it asks to be your friend.')}
        </p>
        {link ? (
          <div className="flex flex-wrap items-center gap-2">
            <TextInput readOnly value={link} onFocus={(event) => event.currentTarget.select()} className="min-w-0 flex-1 font-mono text-[12px]" />
            <Button
              variant="secondary"
              iconLeft={copied ? Check : Copy}
              onClick={() => { void navigator.clipboard?.writeText(link); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }}
            >
              {copied ? t('Copied') : t('Copy')}
            </Button>
          </div>
        ) : (
          <>
            <Button variant="primary" iconLeft={Link2} loading={minting} onClick={() => void createInvite()}>
              {t('Create invite link')}
            </Button>
            {failed && <p className="text-[12.5px] text-danger">{t('That link could not be created. Try again.')}</p>}
          </>
        )}
      </div>
    </Panel>
  )
}

/**
 * Who you study with.
 *
 * A section that has nothing to show is absent rather than empty: three
 * headings over three "nothing here yet" lines is noise on the screen a
 * student sees most often.
 */
export function FriendsPanel({
  friends,
  incoming,
  outgoing,
  onRespond,
  onRemove,
  onStudyTogether,
  onChallenge,
  onCreateInvite,
}: {
  friends: FriendProfile[]
  incoming: FriendProfile[]
  outgoing: FriendProfile[]
  onRespond: (userId: string, accept: boolean) => void
  onRemove: (userId: string) => void
  onStudyTogether: (friend: FriendProfile) => void
  onChallenge: (friend: FriendProfile) => void
  onCreateInvite: () => Promise<{ token: string }>
}) {
  const t = useT()
  return (
    <div className="space-y-4">
      <InviteLinkPanel onCreateInvite={onCreateInvite} />

      {incoming.length > 0 && (
        <Panel>
          <PanelHeader title={t('Asked to be friends')} icon={UserPlus} hint={String(incoming.length)} />
          <ul className="divide-y divide-line">
            {incoming.map((person) => (
              <li key={person.userId} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{person.displayName}</span>
                <Button variant="primary" size="sm" iconLeft={Check} onClick={() => onRespond(person.userId, true)}>
                  {t('Accept')}
                </Button>
                <Button variant="ghost" size="sm" iconLeft={X} onClick={() => onRespond(person.userId, false)}>
                  {t('Decline')}
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel>
        <PanelHeader title={t('Your friends')} icon={Users} hint={friends.length ? String(friends.length) : undefined} />
        {friends.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Users}
              title={t('No friends yet')}
              description={t('Share your invite link, or find someone from your year below.')}
            />
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {friends.map((person) => (
              <li key={person.userId} className="flex flex-wrap items-center gap-2 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{person.displayName}</span>
                <Button variant="secondary" size="sm" iconLeft={Play} onClick={() => onStudyTogether(person)}>
                  {t('Study together')}
                </Button>
                <Button variant="secondary" size="sm" iconLeft={Swords} onClick={() => onChallenge(person)}>
                  {t('Challenge')}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onRemove(person.userId)}>
                  {t('Remove')}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {outgoing.length > 0 && (
        <Panel>
          <PanelHeader title={t('Waiting for an answer')} icon={UserPlus} />
          <ul className="divide-y divide-line">
            {outgoing.map((person) => (
              <li key={person.userId} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink-2">{person.displayName}</span>
                <span className="text-[12px] text-ink-3">{t('Asked')}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  )
}
