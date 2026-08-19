import { useMemo, useState } from 'react'
import { Swords, Check, X, Play, Trophy, Hourglass } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Dialog } from '@/components/ui/Dialog'
import { TextInput } from '@/components/ui/Field'
import { Segmented } from '@/components/ui/Tabs'
import { TopicChooser } from '@/components/qbank/TopicChooser'
import { chooserTopics, questionsInScope, topicKey, type Scope } from '@/data/qbankScope'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import type { Question } from '@/data/qbank'
import type { FriendProfile } from '@/lib/useFriends'
import { CHALLENGE_REFUSALS, type Challenge, type ChallengeSummary } from '@/lib/useChallenges'
import { formatRelativeTime } from '@/lib/format'
import { useT } from '@/lib/i18n'

/** Shown in place of a server reason this map does not know, or a network failure. */
function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
}

/**
 * `myChallenges` gives only `opponentId` — resolving it to a name is the
 * caller's job, from the same friend list Study Together already loaded, so
 * this never opens a second `useFriends()` either.
 */
function opponentName(challenge: ChallengeSummary, friends: FriendProfile[], t: (s: string) => string): string {
  return friends.find((friend) => friend.userId === challenge.opponentId)?.displayName ?? t('Student')
}

/**
 * Who is challenging whom, and what to do about it.
 *
 * Three sections, each absent when empty — a page a student opens often
 * should not greet them with three "nothing here" headings. Nothing here
 * computes a score: a summary only ever carries `myFinished`/`opponentFinished`
 * booleans, never a number, so there is nothing to leak before the server
 * says both sides are done.
 */
export function ChallengePanel({
  challenges,
  friends,
  onRespond,
  onOpen,
}: {
  challenges: ChallengeSummary[]
  friends: FriendProfile[]
  onRespond: (challengeId: string, accept: boolean) => Promise<{ ok: boolean; reason?: string }>
  onOpen: (challengeId: string) => void
}) {
  const t = useT()
  const [actingIds, setActingIds] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState('')

  function markActing(id: string, acting: boolean) {
    setActingIds((prev) => {
      const next = new Set(prev)
      if (acting) next.add(id)
      else next.delete(id)
      return next
    })
  }

  async function handleRespond(challengeId: string, accept: boolean) {
    markActing(challengeId, true)
    try {
      const result = await onRespond(challengeId, accept)
      setMessage(result.ok ? '' : (CHALLENGE_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)))
    } catch {
      setMessage(fallbackRefusal(t))
    } finally {
      markActing(challengeId, false)
    }
  }

  const waiting = challenges.filter((challenge) => challenge.status === 'sent' && !challenge.iAmChallenger)
  const inProgress = challenges.filter(
    (challenge) => challenge.status === 'running' || (challenge.status === 'sent' && challenge.iAmChallenger),
  )
  const finished = challenges.filter((challenge) => challenge.status === 'complete' || challenge.status === 'declined')

  if (!waiting.length && !inProgress.length && !finished.length) return null

  return (
    <div className="space-y-4">
      {waiting.length > 0 && (
        <Panel>
          <PanelHeader title={t('Waiting for your answer')} icon={Swords} hint={String(waiting.length)} />
          <ul className="divide-y divide-line">
            {waiting.map((challenge) => (
              <li key={challenge.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <Avatar name={opponentName(challenge, friends, t)} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">{opponentName(challenge, friends, t)}</span>
                  <span className="mt-0.5 block text-[12px] text-ink-3">{challenge.scopeLabel} · {challenge.questionCount} {t('questions')}</span>
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={Check}
                  disabled={actingIds.has(challenge.id)}
                  onClick={() => void handleRespond(challenge.id, true)}
                >
                  {t('Accept')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconLeft={X}
                  disabled={actingIds.has(challenge.id)}
                  onClick={() => void handleRespond(challenge.id, false)}
                >
                  {t('Decline')}
                </Button>
              </li>
            ))}
          </ul>
          {message && <p role="status" className="border-t border-line px-4 py-2.5 text-[12.5px] text-danger">{message}</p>}
        </Panel>
      )}

      {inProgress.length > 0 && (
        <Panel>
          <PanelHeader title={t('In progress')} icon={Hourglass} hint={String(inProgress.length)} />
          <ul className="divide-y divide-line">
            {inProgress.map((challenge) => {
              const pending = challenge.status === 'sent'
              return (
                <li key={challenge.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar name={opponentName(challenge, friends, t)} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink">{opponentName(challenge, friends, t)}</span>
                    <span className="mt-0.5 block text-[12px] text-ink-3">
                      {challenge.scopeLabel} ·{' '}
                      {pending
                        ? t('Waiting for them to accept')
                        : challenge.myFinished
                          ? t('The comparison opens once your opponent finishes.')
                          : t('Your turn')}
                    </span>
                  </span>
                  {pending ? (
                    <Badge tone="neutral">{t('Sent')}</Badge>
                  ) : (
                    <Button variant="secondary" size="sm" iconLeft={Play} onClick={() => onOpen(challenge.id)}>
                      {t('Continue')}
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>
        </Panel>
      )}

      {finished.length > 0 && (
        <Panel>
          <PanelHeader title={t('Finished')} icon={Trophy} hint={String(finished.length)} />
          <ul className="divide-y divide-line">
            {finished.map((challenge) => (
              <li key={challenge.id}>
                {challenge.status === 'declined' ? (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Avatar name={opponentName(challenge, friends, t)} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] text-ink-2">{opponentName(challenge, friends, t)}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-3">{challenge.scopeLabel} · {formatRelativeTime(challenge.createdAt)}</span>
                    </span>
                    <Badge tone="neutral">{t('Declined')}</Badge>
                  </div>
                ) : (
                  // Scores live only in the full challenge record, read once this
                  // is opened — the summary this list works from never carries them.
                  <button
                    type="button"
                    onClick={() => onOpen(challenge.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-inset"
                  >
                    <Avatar name={opponentName(challenge, friends, t)} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ink">{opponentName(challenge, friends, t)}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-3">{challenge.scopeLabel} · {formatRelativeTime(challenge.createdAt)}</span>
                    </span>
                    <Badge tone="primary">{t('View result')}</Badge>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  )
}

const MAX_QUESTIONS = 40

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** A short label for what was frozen into the challenge, from the scope picked. */
function scopeLabelFor(scope: Scope, libraryTopics: ReturnType<typeof chooserTopics>, t: (s: string) => string): string {
  if (scope.size === 0) return t('All topics')
  if (scope.size === 1) {
    const [key] = scope
    if (key.startsWith('t:')) {
      const topic = libraryTopics.find((candidate) => topicKey(candidate.id) === key)
      if (topic) return topic.title
    }
    return t('One topic')
  }
  return `${scope.size} ${t('topics')}`
}

/**
 * Pick a scope and a length, then freeze it into a challenge sent to one friend.
 *
 * Mirrors how Study Together builds a room's question list — same chooser,
 * same shuffle-and-slice — because a challenge is the same paper, sat alone.
 */
export function ChallengeDialog({
  friend,
  pool,
  onClose,
  onCreate,
  onCreated,
}: {
  friend: FriendProfile
  pool: Question[]
  onClose: () => void
  onCreate: (input: { opponentId: string; questionIds: string[]; scopeLabel: string }) => Promise<{ ok: boolean; reason?: string; challenge?: Challenge }>
  onCreated: (challengeId: string) => void
}) {
  const t = useT()
  const { topics: publishedTopics } = useLiveLibrary()
  // The same merged tree the chooser offers — see `chooserTopics`.
  const libraryTopics = useMemo(() => chooserTopics(pool, publishedTopics), [pool, publishedTopics])
  const [scope, setScope] = useState<Scope>(() => new Set())
  const [lenChoice, setLenChoice] = useState<'5' | '10' | '20' | '40' | 'custom'>('10')
  const [customLen, setCustomLen] = useState(15)
  const count = lenChoice === 'custom' ? Math.min(MAX_QUESTIONS, Math.max(1, customLen || 1)) : Number(lenChoice)
  const available = questionsInScope(pool, scope, libraryTopics)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function submit() {
    setBusy(true)
    setMessage('')
    const picked = shuffle(available).slice(0, Math.min(count, available.length)).map((question) => question.id)
    const result = await onCreate({
      opponentId: friend.userId,
      questionIds: picked,
      scopeLabel: scopeLabelFor(scope, libraryTopics, t),
    })
    setBusy(false)
    if (!result.ok || !result.challenge) {
      setMessage(CHALLENGE_REFUSALS[result.reason ?? ''] ?? t('That challenge could not be sent.'))
      return
    }
    onCreated(result.challenge.id)
  }

  return (
    <Dialog onClose={onClose} label={`${t('Challenge')} ${friend.displayName}`} size="md">
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-serif text-[17px] font-semibold text-ink">{t('Challenge')} {friend.displayName}</h2>
        <p className="mt-0.5 text-[12.5px] text-ink-3">{t('The same questions, sat separately. Results open once you have both finished.')}</p>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Which topics?')}</p>
          <TopicChooser value={scope} onChange={setScope} pool={pool} />
          <p className="mt-2 text-[12px] text-ink-3">
            {available.length} {t('questions available')}{scope.size === 0 ? ` · ${t('all topics')}` : ''}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Number of questions')}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Segmented
              value={lenChoice}
              onChange={(value) => setLenChoice(value as typeof lenChoice)}
              items={[{ value: '5', label: '5' }, { value: '10', label: '10' }, { value: '20', label: '20' }, { value: '40', label: '40' }, { value: 'custom', label: t('Custom') }]}
            />
            {lenChoice === 'custom' && (
              <TextInput
                type="number"
                min={1}
                max={MAX_QUESTIONS}
                value={customLen}
                onChange={(event) => setCustomLen(Number(event.target.value))}
                className="w-24"
              />
            )}
          </div>
        </div>

        {message && <p role="status" className="text-[12.5px] text-danger">{message}</p>}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" iconLeft={Swords} loading={busy} disabled={available.length === 0} onClick={() => void submit()}>
            {available.length === 0 ? t('No questions published yet') : t('Send challenge')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
