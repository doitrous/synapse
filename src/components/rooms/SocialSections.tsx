import { DiscoverabilityControl } from './DiscoverabilityControl'
import { AddFriendButton } from '@/components/social/AddFriendButton'
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, Copy, LogIn, Plus, Trophy, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useIdentity } from '@/lib/useIdentity'
import type { LucideIcon } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Collapse } from '@/components/ui/Collapse'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Field, TextInput } from '@/components/ui/Field'
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { TopicChooser } from '@/components/qbank/TopicChooser'
import { chooserTopics, questionsInScope, type Scope } from '@/data/qbankScope'
import { usePublishedQuestionSummaries } from '@/lib/usePublishedQuestions'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { ROOM_REFUSALS, useMyRooms, useStudyRoomActions } from '@/lib/useStudyRooms'
import { FRIEND_REFUSALS, useFriends, type FriendProfile } from '@/lib/useFriends'
import { useChallengeActions, useMyChallenges } from '@/lib/useChallenges'
import { FriendsPanel } from '@/components/social/FriendsPanel'
import { ChallengeDialog, ChallengePanel } from '@/components/social/ChallengePanel'
import { DemoFriendsPreview, DemoSharedTestsPreview } from '@/components/social/DemoCollaborationPreview'
import { API_MODE } from '@/lib/api'
import { useRelativeTime } from '@/lib/useRelativeTime'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const MAX_QUESTIONS = 40
/** What a shared test started from the Friends list uses when nobody has set anything. */
const FRIEND_TEST_LENGTH = 10

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * A section of the lobby that is not the point of the lobby.
 *
 * Shared tests and friends were two of three tabs on the old page and are two
 * quiet, closed disclosures here. Closed by default is the demotion: the room
 * is what this page is for, and a student who wants the other two can still
 * reach them in one click, from the page the link in their history already
 * points at.
 */
function QuietSection({
  title,
  icon,
  hint,
  action,
  children,
}: {
  title: string
  icon: LucideIcon
  hint?: ReactNode
  action?: ReactNode
  children: ReactNode
}) {
  const t = useT()
  const [open, setOpen] = useState(title===t('Friends'))
  const id = useId()
  return (
    <Panel>
      <PanelHeader
        title={title}
        icon={icon}
        hint={hint}
        action={
          <div className="flex items-center gap-2">{action}<Button
            variant="ghost"
            size="sm"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((current) => !current)}
          >
            <Icon icon={ChevronDown} size={15} className="chevron-turn" open={open} />
            {open ? t('Hide') : t('Show')}
          </Button></div>
        }
      />
      <Collapse open={open} id={id}>
        <div className="p-4">{children}</div>
      </Collapse>
    </Panel>
  )
}

/* ---- Shared tests ------------------------------------------------------ */

/**
 * The old Study Together "Shared tests" tab, whole.
 *
 * Create a set, hand out the code, sit it together, compare afterwards. It
 * moved here rather than being dropped when its page became a redirect: a
 * shared test is a different thing from a room — one paper, marked by the
 * server — and nothing else in the product does it.
 */
export function SharedTestsSection({ onOpenSharedTest }: { onOpenSharedTest: (roomId: string) => void }) {
  const t = useT()
  const relativeTime = useRelativeTime()
  const questions = usePublishedQuestionSummaries()
  const { topics: publishedTopics } = useLiveLibrary()
  const { rooms, reload: reloadRooms } = useMyRooms()
  const { create, join } = useStudyRoomActions()

  const [scope, setScope] = useState<Scope>(new Set())
  const [name, setName] = useState('')
  const [lenChoice, setLenChoice] = useState<'5' | '10' | '20' | '40' | 'custom'>('10')
  const [customLen, setCustomLen] = useState(15)
  const [timed, setTimed] = useState(true)
  const [joinCode, setJoinCode] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const count = lenChoice === 'custom' ? Math.min(MAX_QUESTIONS, Math.max(1, customLen || 1)) : Number(lenChoice)
  const libraryTopics = useMemo(() => chooserTopics(questions, publishedTopics), [questions, publishedTopics])
  const available = questionsInScope(questions, scope, libraryTopics)

  async function createRoom() {
    setBusy(true)
    setMessage('')
    const picked = shuffle(available).slice(0, Math.min(count, available.length)).map((question) => question.id)
    const result = await create({ name: name.trim() || t('Shared test'), questionIds: picked, timed, secondsPerQuestion: null })
    setBusy(false)
    if (!result.ok) { setMessage(ROOM_REFUSALS[result.reason ?? ''] ?? t('That test could not be created.')); return }
    setName('')
    await reloadRooms()
    onOpenSharedTest(result.room!.id)
  }

  async function joinRoom() {
    setBusy(true)
    setMessage('')
    const result = await join(joinCode.trim())
    setBusy(false)
    if (!result.ok) { setMessage(ROOM_REFUSALS[result.reason ?? ''] ?? t('That code could not be used.')); return }
    setJoinCode('')
    await reloadRooms()
    onOpenSharedTest(result.room!.id)
  }

  const open = rooms.filter((room) => room.status !== 'closed')
  const past = rooms.filter((room) => room.status === 'closed')

  return (
    <QuietSection
      title={t('Shared tests')}
      icon={Trophy}
      hint={open.length ? `${open.length} ${t('open')}` : t('One paper, sat together')}
    >
      {!API_MODE ? (
        <DemoSharedTestsPreview />
      ) : (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.7fr)]">
          <div className="space-y-5">
            <Field label={t('Name it')}>
              <TextInput value={name} onChange={(event) => setName(event.target.value)} placeholder={t('e.g. Cardiology crunch')} />
            </Field>

            <div>
              <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Which topics?')}</p>
              <TopicChooser value={scope} onChange={setScope} pool={questions} />
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
                  <TextInput type="number" min={1} max={MAX_QUESTIONS} value={customLen} onChange={(event) => setCustomLen(Number(event.target.value))} className="w-24" />
                )}
              </div>
            </div>

            <label className="flex items-center justify-between gap-4">
              <span>
                <span className="block text-[13px] font-medium text-ink">{t('Timed')}</span>
                <span className="mt-0.5 block text-[12px] text-ink-3">{t('Recorded on each answer, for comparing pace afterwards.')}</span>
              </span>
              <Toggle checked={timed} onChange={setTimed} label={t('Timed')} />
            </label>

            {/* Always mounted: a live region inserted with its text is often not announced. */}
            <p role="status" className={cn('text-[12.5px] text-danger', !message && 'sr-only')}>{message}</p>

            <Button variant="primary" iconLeft={Plus} loading={busy} disabled={available.length === 0} onClick={() => void createRoom()}>
              {available.length === 0 ? t('No questions published yet') : t('Create and get a code')}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-line p-4">
              <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Join with a code')}</p>
              <TextInput
                value={joinCode}
                onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
                onKeyDown={(event) => { if (event.key === 'Enter') void joinRoom() }}
                placeholder={t('e.g. K7PQR2')}
                className="font-mono tracking-[0.2em]"
                aria-label={t('Shared test code')}
              />
              <Button className="mt-3 w-full" variant="secondary" iconLeft={LogIn} loading={busy} disabled={joinCode.trim().length < 4} onClick={() => void joinRoom()}>
                {t('Join')}
              </Button>
            </div>

            <div className="rounded-lg border border-line">
              <p className="border-b border-line px-4 py-2.5 text-[12.5px] font-medium text-ink-2">{t('Your shared tests')}</p>
              {open.length === 0 ? (
                <p className="px-4 py-5 text-center text-[12.5px] text-ink-3">{t('No shared test open. Create one, or join with a code.')}</p>
              ) : (
                <ul className="divide-y divide-line">
                  {open.map((room) => (
                    <li key={room.id}>
                      <button type="button" onClick={() => onOpenSharedTest(room.id)} className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-inset">
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13.5px] font-medium text-ink">{room.name}</span>
                          <span className="mt-0.5 block text-[12px] text-ink-3">
                            <span className="font-mono">{room.code}</span> · {room.members} {room.members === 1 ? t('person') : t('people')} · {room.questionCount} {t('questions')}
                          </span>
                        </span>
                        <Badge tone={room.status === 'lobby' ? 'neutral' : 'primary'}>{room.status === 'lobby' ? t('Waiting') : t('Running')}</Badge>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {past.length > 0 && (
              <div className="rounded-lg border border-line">
                <p className="border-b border-line px-4 py-2.5 text-[12.5px] font-medium text-ink-2">{t('Finished')}</p>
                <ul className="divide-y divide-line">
                  {past.map((room) => (
                    <li key={room.id} className="flex items-center gap-3 px-4 py-3">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-medium text-ink">{room.name}</span>
                        <span className="mt-0.5 block text-[12px] text-ink-3">
                          {room.members} {room.members === 1 ? t('person') : t('people')} · {relativeTime(room.createdAt)}
                        </span>
                      </span>
                      <span className="tnum shrink-0 font-mono text-[13px] font-medium text-ink">
                        {room.questionCount ? `${Math.round((room.correct / room.questionCount) * 100)}%` : '—'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </QuietSection>
  )
}

/* ---- Friends ----------------------------------------------------------- */

/**
 * The old Friends tab, whole: requests, the directory, challenges, and the
 * invite link that arrives as `?invite=` on this page.
 *
 * The one thing that changed shape is "Study together": it used to inherit
 * whatever topics and length were set on the shared-test create panel, which
 * were on screen beside it. Those live in their own section now, so a test
 * started from a friend's row uses ten questions from every topic — stated in
 * the panel rather than left to be discovered.
 */
/**
 * Your own handle, shown so you can hand it to a friend to add you.
 *
 * The friend adds by username (the Add button), so the fastest way in is to
 * read yours off the screen and send it — no link to mint, no directory to
 * search.
 */
function YourUsernameShare() {
  const t = useT()
  const { profile } = useIdentity()
  const [copied, setCopied] = useState(false)
  if (!profile.username) {
    return (
      <p className="rounded-lg border border-line bg-inset px-3 py-2 text-[12.5px] text-ink-2">
        <Link to="/app/account" className="underline">{t('Set a username in Account')}</Link> {t('so friends can add you.')}
      </p>
    )
  }
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-inset px-3 py-2">
      <span className="text-[12.5px] text-ink-2">{t('Your username')}: <strong className="text-ink">@{profile.username}</strong></span>
      <Button
        size="sm"
        variant="ghost"
        iconLeft={Copy}
        aria-label={t('Copy your username')}
        onClick={() => { void navigator.clipboard?.writeText(`@${profile.username}`); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }}
      >
        {copied ? t('Copied') : t('Copy')}
      </Button>
    </div>
  )
}

export function FriendsSection({
  onOpenSharedTest,
  onOpenChallenge,
}: {
  onOpenSharedTest: (roomId: string) => void
  onOpenChallenge: (challengeId: string) => void
}) {
  const t = useT()
  const questions = usePublishedQuestionSummaries()
  const { create } = useStudyRoomActions()
  const { reload: reloadRooms } = useMyRooms()
  const {
    friends, incoming, outgoing, blocked, respond, remove, unblock, redeemInvite, reload:reloadFriends,
  } = useFriends()
  const { challenges, reload: reloadChallenges } = useMyChallenges()
  const { create: createChallenge, respond: respondChallenge } = useChallengeActions()

  const [inviteNotice, setInviteNotice] = useState<{ tone: 'success' | 'danger'; text: string } | null>(null)
  const [challengeTarget, setChallengeTarget] = useState<FriendProfile | null>(null)

  /** Redeem `?invite=` once on arrival — the link has to work with nothing else done. */
  const [searchParams, setSearchParams] = useSearchParams()
  const redeemedToken = useRef<string | null>(null)
  useEffect(() => {
    if (!API_MODE) return
    const token = searchParams.get('invite')
    if (!token || redeemedToken.current === token) return
    redeemedToken.current = token
    void (async () => {
      const result = await redeemInvite(token)
      setInviteNotice(
        result.ok
          ? { tone: 'success', text: t('Friend request sent.') }
          : { tone: 'danger', text: FRIEND_REFUSALS[result.reason ?? ''] ?? t('That invite link could not be used.') },
      )
      setSearchParams((current) => {
        const next = new URLSearchParams(current)
        next.delete('invite')
        return next
      }, { replace: true })
    })()
  }, [searchParams, setSearchParams, redeemInvite, t])

  const handleStudyTogether = useCallback(
    async (friend: FriendProfile) => {
      const picked = shuffle([...questions]).slice(0, FRIEND_TEST_LENGTH).map((question) => question.id)
      const result = await create({
        name: `${t('Study session with')} ${friend.displayName}`,
        questionIds: picked,
        timed: true,
        secondsPerQuestion: null,
        inviteUserIds: [friend.userId],
      })
      if (!result.ok) return { ok: false as const, reason: result.reason }
      await reloadRooms()
      onOpenSharedTest(result.room!.id)
      return { ok: true as const }
    },
    [questions, create, reloadRooms, onOpenSharedTest, t],
  )

  return (
    <QuietSection
      title={t('Friends')}
      icon={Users}
      hint={friends.length ? `${friends.length}` : undefined}
      action={<AddFriendButton onAdded={()=>void reloadFriends()}/>}
    >
      {!API_MODE ? (
        <DemoFriendsPreview />
      ) : (
        <div className="space-y-4">
          <YourUsernameShare/>
          <DiscoverabilityControl/>
          <p role="status" className={cn('text-[12.5px]', !inviteNotice && 'sr-only', inviteNotice?.tone === 'success' ? 'text-success' : 'text-danger')}>
            {inviteNotice?.text}
          </p>
          <ChallengePanel
            challenges={challenges}
            friends={friends}
            onRespond={respondChallenge}
            onOpen={onOpenChallenge}
          />
          <FriendsPanel
            friends={friends}
            incoming={incoming}
            outgoing={outgoing}
            blocked={blocked}
            onRespond={respond}
            onRemove={remove}
            onStudyTogether={handleStudyTogether}
            onChallenge={setChallengeTarget}
            onUnblock={unblock}
          />
          {challengeTarget && (
            <ChallengeDialog
              friend={challengeTarget}
              pool={questions}
              onClose={() => setChallengeTarget(null)}
              onCreate={createChallenge}
              onCreated={(challengeId) => {
                setChallengeTarget(null)
                void reloadChallenges()
                onOpenChallenge(challengeId)
              }}
            />
          )}
        </div>
      )}
    </QuietSection>
  )
}
