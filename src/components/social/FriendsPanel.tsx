import { useState } from 'react'
import { UserPlus, Users, Check, X, Swords, Play, Ban } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { FRIEND_REFUSALS, type FriendProfile } from '@/lib/useFriends'
import { ROOM_REFUSALS } from '@/lib/useStudyRooms'
import { useT } from '@/lib/i18n'

/** Shown in place of a server reason this map does not know, or a network failure. */
function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
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
  blocked,
  onRespond,
  onRemove,
  onStudyTogether,
  onChallenge,
  onUnblock,
}: {
  friends: FriendProfile[]
  incoming: FriendProfile[]
  outgoing: FriendProfile[]
  blocked: FriendProfile[]
  onRespond: (userId: string, accept: boolean) => Promise<{ ok: boolean; reason?: string }>
  onRemove: (userId: string) => Promise<{ ok: boolean; reason?: string }>
  // Creates the room and opens it; resolves once that is known so this panel
  // can show its own loading state and, on failure, the reason.
  onStudyTogether: (friend: FriendProfile) => Promise<{ ok: boolean; reason?: string }>
  onChallenge: (friend: FriendProfile) => void
  onUnblock: (userId: string) => Promise<{ ok: boolean }>
}) {
  const t = useT()

  // One in-flight row at a time is disabled by its own id, so a double-click
  // cannot start a second mutation (and the reload it triggers) before the
  // first has resolved.
  const [actingIds, setActingIds] = useState<Set<string>>(new Set())
  const [requestsMessage, setRequestsMessage] = useState('')
  const [friendsMessage, setFriendsMessage] = useState('')
  const [blockedMessage, setBlockedMessage] = useState('')

  function markActing(userId: string, acting: boolean) {
    setActingIds((prev) => {
      const next = new Set(prev)
      if (acting) next.add(userId)
      else next.delete(userId)
      return next
    })
  }

  async function handleRespond(userId: string, accept: boolean) {
    markActing(userId, true)
    try {
      const result = await onRespond(userId, accept)
      setRequestsMessage(result.ok ? '' : (FRIEND_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)))
    } catch {
      setRequestsMessage(fallbackRefusal(t))
    } finally {
      markActing(userId, false)
    }
  }

  async function handleRemove(userId: string) {
    markActing(userId, true)
    try {
      const result = await onRemove(userId)
      setFriendsMessage(result.ok ? '' : (FRIEND_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)))
    } catch {
      setFriendsMessage(fallbackRefusal(t))
    } finally {
      markActing(userId, false)
    }
  }

  async function handleUnblock(userId: string) {
    markActing(userId, true)
    try {
      const result = await onUnblock(userId)
      setBlockedMessage(result.ok ? '' : fallbackRefusal(t))
    } catch {
      setBlockedMessage(fallbackRefusal(t))
    } finally {
      markActing(userId, false)
    }
  }

  async function handleStudyTogether(friend: FriendProfile) {
    markActing(friend.userId, true)
    try {
      const result = await onStudyTogether(friend)
      // On success the page navigates straight into the room, so there is
      // nothing left here to show; only a refusal needs a message.
      if (!result.ok) setFriendsMessage(ROOM_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t))
    } catch {
      setFriendsMessage(fallbackRefusal(t))
    } finally {
      markActing(friend.userId, false)
    }
  }

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
                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={Check}
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleRespond(person.userId, true)}
                >
                  {t('Accept')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconLeft={X}
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleRespond(person.userId, false)}
                >
                  {t('Decline')}
                </Button>
              </li>
            ))}
          </ul>
          {requestsMessage && <p role="status" className="border-t border-line px-4 py-2.5 text-[12.5px] text-danger">{requestsMessage}</p>}
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
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] text-ink">{person.displayName}</span>
                  {person.statusMessage && <span className="block truncate text-[11px] text-ink-3">{person.statusMessage}</span>}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  iconLeft={Play}
                  loading={actingIds.has(person.userId)}
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleStudyTogether(person)}
                >
                  {t('Study together')}
                </Button>
                <Button variant="secondary" size="sm" iconLeft={Swords} onClick={() => onChallenge(person)}>
                  {t('Challenge')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleRemove(person.userId)}
                >
                  {t('Remove')}
                </Button>
              </li>
            ))}
          </ul>
        )}
        {friendsMessage && <p role="status" className="border-t border-line px-4 py-2.5 text-[12.5px] text-danger">{friendsMessage}</p>}
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

      {blocked.length > 0 && (
        <Panel>
          <PanelHeader title={t('Blocked')} icon={Ban} hint={String(blocked.length)} />
          <ul className="divide-y divide-line">
            {blocked.map((person) => (
              <li key={person.userId} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink-2">{person.displayName}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleUnblock(person.userId)}
                >
                  {t('Unblock')}
                </Button>
              </li>
            ))}
          </ul>
          {blockedMessage && <p role="status" className="border-t border-line px-4 py-2.5 text-[12.5px] text-danger">{blockedMessage}</p>}
        </Panel>
      )}
    </div>
  )
}
