import { UserPlus, Users, Check, X, Swords, Play } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import type { FriendProfile } from '@/lib/useFriends'
import { useT } from '@/lib/i18n'

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
}: {
  friends: FriendProfile[]
  incoming: FriendProfile[]
  outgoing: FriendProfile[]
  onRespond: (userId: string, accept: boolean) => void
  onRemove: (userId: string) => void
  onStudyTogether: (friend: FriendProfile) => void
  onChallenge: (friend: FriendProfile) => void
}) {
  const t = useT()
  return (
    <div className="space-y-4">
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
