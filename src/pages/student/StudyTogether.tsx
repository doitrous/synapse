import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Users, Hash, Copy, Check, Play, Plus, LogIn, Trophy, Eye, ArrowLeft, ArrowRight, Grid3x3, Crosshair, Shuffle } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { QuestionView } from '@/components/qbank/QuestionView'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Meter } from '@/components/ui/Meter'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, TextInput } from '@/components/ui/Field'
import { Segmented, Tabs } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import type { Question } from '@/data/qbank'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { TopicChooser } from '@/components/qbank/TopicChooser'
import { chooserTopics, questionsInScope, type Scope } from '@/data/qbankScope'
import { useMastery } from '@/lib/useMastery'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { attemptSeconds } from '@/data/attempts'
import { ROOM_REFUSALS, useMyRooms, useRoom, useStudyRoomActions } from '@/lib/useStudyRooms'
import { FRIEND_REFUSALS, useFriends, type FriendProfile } from '@/lib/useFriends'
import { useMyChallenges, useChallengeActions } from '@/lib/useChallenges'
import { FriendsPanel } from '@/components/social/FriendsPanel'
import { ChallengePanel, ChallengeDialog } from '@/components/social/ChallengePanel'
import { ChallengeRunner } from '@/components/social/ChallengeRunner'
import { PartiesPanel } from '@/components/social/PartiesPanel'
import { API_MODE } from '@/lib/api'
import { formatRelativeTime } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const MAX_QUESTIONS = 40

/** A fresh seed for a link nobody has opened yet — shared by all three minigames below. */
function randomGameSeed(): number {
  return Math.floor(Math.random() * 0x7fffffff)
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Sit a shared test, one question at a time.
 *
 * The answer is sent to the server, which marks it against the published
 * question and returns the verdict. Nothing about the score is decided here —
 * other people see it, so self-reporting is not an option.
 */
function RoomRunner({ roomId, onExit }: { roomId: string; onExit: () => void }) {
  const t = useT()
  const questions = usePublishedQuestions()
  const { room, reload } = useRoom(roomId)
  const { start, answer, finish } = useStudyRoomActions()
  const { record } = useMastery()
  const logAttempt = useRecordAttempt()
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [verdict, setVerdict] = useState<{ correct: boolean; correctIndex: number } | null>(null)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)

  const byId = useMemo(() => new Map(questions.map((question) => [question.id, question])), [questions])
  const answeredIds = useMemo(() => new Set(room?.myAnswers.map((entry) => entry.questionId) ?? []), [room])

  // Which question is being asked, derived above the early returns below so the
  // effect that times it can be a hook like any other.
  const remaining = useMemo(
    () => (room?.questionIds ?? []).filter((id) => !answeredIds.has(id)),
    [room, answeredIds],
  )
  const currentId = remaining[Math.min(idx, Math.max(0, remaining.length - 1))]

  /*
   * When the question on screen appeared.
   *
   * A timed room recorded `seconds: null` against every answer — the column was
   * written, the room's own `timed` flag was set, and the value was always
   * empty — so the one mode built around a clock was the one that measured
   * nothing. There is no clock on screen here and there should not be: this is
   * measured, not displayed.
   *
   * Keyed on the question rather than reset from the Next handler, because Next
   * is not the only thing that changes it: skipping an archived question does,
   * and so does the poll bringing back a room this student has answered more of
   * elsewhere. Starting from when the question actually appears also keeps the
   * reload that fetches it out of the next question's time.
   */
  const questionShownAt = useRef(Date.now())
  useEffect(() => { questionShownAt.current = Date.now() }, [currentId])

  if (!room) {
    return <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading the shared test…')}</Panel>
  }

  const roster = (
    <Panel className="h-fit">
      <PanelHeader title={t('Who is in')} icon={Users} hint={`${room.members.length} ${room.members.length === 1 ? t('person') : t('people')}`} />
      <ul className="divide-y divide-line">
        {room.members.map((member) => (
          <li key={member.userId} className="flex items-center gap-3 px-4 py-2.5">
            <Avatar name={member.displayName ?? 'Student'} size="sm" />
            <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{member.displayName ?? t('Student')}</span>
            {member.finished
              ? <Badge tone="success">{member.correct !== null ? `${member.correct} / ${room.questionCount}` : t('Finished')}</Badge>
              : <span className="tnum font-mono text-[11.5px] text-ink-3">{member.answered} / {room.questionCount}</span>}
          </li>
        ))}
      </ul>
    </Panel>
  )

  /* ---- Lobby --------------------------------------------------------- */
  if (room.status === 'lobby') {
    return (
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={room.name} icon={Hash} action={<Badge tone="primary">{t('Waiting to start')}</Badge>} />
          <div className="p-5">
            <p className="text-[12.5px] text-ink-3">{t('Share this code so others can join')}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="tnum rounded-lg border border-line bg-surface-2 px-4 py-2 font-mono text-[24px] font-semibold tracking-[0.2em] text-ink">{room.code}</span>
              <Button
                variant="secondary"
                iconLeft={copied ? Check : Copy}
                onClick={() => { void navigator.clipboard?.writeText(room.code); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }}
              >
                {copied ? t('Copied') : t('Copy code')}
              </Button>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
              {room.questionCount} {t('questions')} · {room.timed ? t('timed') : t('untimed')}. {t('Everyone answers the same set at their own pace, and results open once you finish.')}
            </p>
            <div className="mt-5 flex gap-2">
              {room.isHost ? (
                <Button variant="primary" iconLeft={Play} loading={busy} onClick={async () => { setBusy(true); await start(room.id); await reload(); setBusy(false) }}>
                  {t('Start the test')}
                </Button>
              ) : (
                <p className="text-[13px] text-ink-3">{t('Waiting for the host to start.')}</p>
              )}
              <Button variant="ghost" onClick={onExit}>{t('Leave')}</Button>
            </div>
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Review -------------------------------------------------------- */
  /**
   * The paper, afterwards.
   *
   * Finishing used to end at a percentage: the questions just sat were
   * unreachable, so the one moment a student is most ready to learn from them
   * had nothing to look at. The verdict still comes from the server record —
   * only which option to mark as right is read from the published question,
   * exactly as the Question Bank's own review does.
   */
  if (room.myFinished && reviewing) {
    const answered = room.questionIds
      .map((id) => ({ question: byId.get(id), entry: room.myAnswers.find((item) => item.questionId === id) }))
      .filter((row): row is { question: Question; entry: NonNullable<typeof row.entry> } => Boolean(row.question && row.entry))
    const current = answered[Math.min(reviewIdx, answered.length - 1)]
    return (
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader
            title={t('Review answers')}
            icon={Eye}
            hint={answered.length ? `${Math.min(reviewIdx + 1, answered.length)} / ${answered.length}` : undefined}
            action={<Button variant="ghost" size="sm" iconLeft={ArrowLeft} onClick={() => setReviewing(false)}>{t('Back to your result')}</Button>}
          />
          {current ? (
            <div className="p-5">
              <QuestionView
                question={current.question}
                chosen={current.entry.chosenIndex}
                correctIndex={current.question.options.findIndex((option: Question['options'][number]) => option.correct)}
                revealed
                onChoose={() => undefined}
              />
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <Button variant="ghost" iconLeft={ArrowLeft} disabled={reviewIdx === 0} onClick={() => setReviewIdx((index) => Math.max(0, index - 1))}>
                  {t('Previous')}
                </Button>
                <Button
                  variant="secondary"
                  iconRight={ArrowRight}
                  disabled={reviewIdx >= answered.length - 1}
                  onClick={() => setReviewIdx((index) => Math.min(answered.length - 1, index + 1))}
                >
                  {t('Next')}
                </Button>
              </div>
            </div>
          ) : (
            <p className="px-5 py-10 text-center text-[13px] text-ink-3">{t('These questions are no longer published, so they cannot be reopened.')}</p>
          )}
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Results ------------------------------------------------------- */
  if (room.myFinished) {
    const myCorrect = room.myAnswers.filter((entry) => entry.correct).length
    const pct = room.questionCount ? Math.round((myCorrect / room.questionCount) * 100) : 0
    const stillWorking = room.members.filter((member) => !member.finished).length
    const reviewable = room.questionIds.some((id) => byId.has(id))
    return (
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={t('Your result')} icon={Trophy} hint={room.name} />
          <div className="p-6 text-center">
            <p className="tnum font-mono text-[40px] font-semibold leading-none text-ink">{pct}%</p>
            <p className="mt-2 text-[14px] text-ink-2">{myCorrect} {t('of')} {room.questionCount} {t('correct')}</p>
            <Meter value={pct} tone={pct >= 70 ? 'success' : pct >= 50 ? 'primary' : 'warning'} className="mx-auto mt-4 max-w-sm" />
            <p className="mt-5 text-[12.5px] text-ink-3">
              {stillWorking > 0
                ? `${stillWorking} ${stillWorking === 1 ? t('person is') : t('people are')} ${t('still working. Their scores appear as they finish.')}`
                : t('Everyone has finished.')}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {reviewable && (
                <Button variant="primary" iconLeft={Eye} onClick={() => { setReviewIdx(0); setReviewing(true) }}>
                  {t('Review answers')}
                </Button>
              )}
              <Button variant="secondary" onClick={onExit}>{t('Back to shared tests')}</Button>
            </div>
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Running ------------------------------------------------------- */
  const question = currentId ? byId.get(currentId) : undefined

  if (!remaining.length) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[14px] font-medium text-ink">{t('You have answered every question.')}</p>
        <Button className="mt-4" variant="primary" loading={busy} onClick={async () => { setBusy(true); await finish(room.id); await reload(); setBusy(false) }}>
          {t('Finish and see results')}
        </Button>
      </Panel>
    )
  }

  if (!question) {
    // The question was archived after the room was created; skipping it is
    // better than blocking the whole test on content that no longer exists.
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{t('This question is no longer available.')}</p>
        <Button className="mt-4" variant="secondary" onClick={() => setIdx((current) => current + 1)}>{t('Skip it')}</Button>
      </Panel>
    )
  }

  async function commit() {
    if (chosen === null || !question) return
    // Read before the request, not after it: the student stopped thinking when
    // they pressed Submit, and how long the server took to mark it is not time
    // they spent on the question.
    const seconds = attemptSeconds(room!.timed, questionShownAt.current, Date.now())
    setBusy(true)
    const result = await answer(room!.id, { questionId: question.id, chosenIndex: chosen, seconds })
    setBusy(false)
    if (!result.ok) return
    setVerdict({ correct: Boolean(result.correct), correctIndex: result.correctIndex ?? -1 })
    // Shared work counts toward the same record as solo work.
    const conceptIds = question.conceptIds ?? []
    if (conceptIds.length) record({ conceptIds, source: 'question', correct: Boolean(result.correct) })
    logAttempt({
      surface: 'room',
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      difficulty: question.difficulty,
      conceptIds,
      correct: Boolean(result.correct),
      seconds,
      sessionId: `room-${room!.id}`,
    })
  }

  const answeredCount = answeredIds.size

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
      <Panel>
        <PanelHeader title={room.name} icon={Hash} hint={`${answeredCount + 1} / ${room.questionCount}`} />
        <div className="p-5">
          <QuestionView
            question={question}
            chosen={chosen}
            revealed={Boolean(verdict)}
            correctIndex={verdict?.correctIndex}
            onChoose={setChosen}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {verdict ? (
              <Button
                variant="primary"
                onClick={async () => { setVerdict(null); setChosen(null); setIdx(0); await reload() }}
              >
                {remaining.length <= 1 ? t('See results') : t('Next question')}
              </Button>
            ) : (
              <Button variant="primary" disabled={chosen === null || busy} loading={busy} onClick={() => void commit()}>{t('Submit answer')}</Button>
            )}
            <Button variant="ghost" onClick={onExit}>{t('Leave')}</Button>
          </div>
          {verdict && (
            <p className={cn('mt-3 text-[13px] font-medium', verdict.correct ? 'text-success' : 'text-danger')}>
              {verdict.correct ? t('Correct.') : t('Not this time.')}
            </p>
          )}
        </div>
      </Panel>
      {roster}
    </div>
  )
}

/**
 * Shared tests: create one, join one by code, or open one you are already in.
 *
 * Everything on this page used to be a prop. The lobby listed three named
 * classmates who did not exist, "Open now" listed two rooms with invented
 * codes, the finished list showed three tests with invented averages, and
 * "Start test" flipped a boolean. There is a backend behind all of it now.
 */
export function StudyTogether() {
  const t = useT()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'tests' | 'friends' | 'parties'>('tests')
  const questions = usePublishedQuestions()
  const { rooms, reload: reloadRooms } = useMyRooms()
  const { create, join } = useStudyRoomActions()
  const [name, setName] = useState('')
  const [scope, setScope] = useState<Scope>(() => new Set())
  const [lenChoice, setLenChoice] = useState<'5' | '10' | '20' | '40' | 'custom'>('10')
  const [customLen, setCustomLen] = useState(15)
  const count = lenChoice === 'custom' ? Math.min(MAX_QUESTIONS, Math.max(1, customLen || 1)) : Number(lenChoice)
  const [timed, setTimed] = useState(true)
  const [joinCode, setJoinCode] = useState('')
  const [openRoomId, setOpenRoomId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const { topics: publishedTopics } = useLiveLibrary()
  // The same merged tree the chooser offers — see `chooserTopics`.
  const libraryTopics = useMemo(() => chooserTopics(questions, publishedTopics), [questions, publishedTopics])
  const available = questionsInScope(questions, scope, libraryTopics)

  const { friends, incoming, outgoing, respond, remove, request, searchDirectory, mintInvite, redeemInvite } = useFriends()
  const [inviteNotice, setInviteNotice] = useState<{ tone: 'success' | 'danger'; text: string } | null>(null)

  const { challenges, reload: reloadChallenges } = useMyChallenges()
  const { create: createChallenge, respond: respondChallenge } = useChallengeActions()
  const [challengeTarget, setChallengeTarget] = useState<FriendProfile | null>(null)
  const [openChallengeId, setOpenChallengeId] = useState<string | null>(null)

  /**
   * Start a shared test with this friend already seated in it.
   *
   * Uses whatever topics/length/timing are set on the "Create a shared test"
   * panel, same as a code-based room — the only difference is the friend
   * lands in it without ever seeing a code. `FriendsPanel` owns the loading
   * state and any refusal message; this just does the work and reports back.
   */
  const handleStudyTogether = useCallback(
    async (friend: FriendProfile) => {
      const picked = shuffle(available).slice(0, Math.min(count, available.length)).map((question) => question.id)
      const result = await create({
        name: `${t('Study session with')} ${friend.displayName}`,
        questionIds: picked,
        timed,
        secondsPerQuestion: null,
        inviteUserIds: [friend.userId],
      })
      if (!result.ok) return { ok: false as const, reason: result.reason }
      await reloadRooms()
      setOpenRoomId(result.room!.id)
      return { ok: true as const }
    },
    [available, count, timed, create, reloadRooms, t],
  )
  const handleChallenge = useCallback((friend: FriendProfile) => setChallengeTarget(friend), [])

  /**
   * A fresh seed is the whole invitation: whoever opens one of these links
   * runs the same deterministic generator — `buildGrid`, `buildSpotter`, or
   * `buildBoard` — over the same published content and lands on the identical
   * game, with no room and no server round trip to arrange first. None of the
   * three needs any other parameter: each game's own default (Term Grid's
   * first published category, Term Match's default mode) resolves the same
   * way for both students, since they read the same glossary or slide set.
   */
  const handlePlayTermGrid = useCallback(() => {
    navigate(`/app/term-grid?seed=${randomGameSeed()}`)
  }, [navigate])
  const handlePlaySpotter = useCallback(() => {
    navigate(`/app/spotter?seed=${randomGameSeed()}`)
  }, [navigate])
  const handlePlayTermMatch = useCallback(() => {
    navigate(`/app/term-match?seed=${randomGameSeed()}`)
  }, [navigate])

  /**
   * Redeem `?invite=` once on arrival.
   *
   * The link's whole point is to work with no other setup, so it has to be
   * caught here rather than requiring the student to find the Friends tab
   * themselves. Guarded by a ref rather than just checking the param, because
   * clearing the param itself triggers a re-render this effect would otherwise
   * see before the URL update has landed.
   */
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
      setTab('friends')
      setSearchParams((current) => {
        const next = new URLSearchParams(current)
        next.delete('invite')
        return next
      }, { replace: true })
    })()
  }, [searchParams, setSearchParams, redeemInvite, t])

  /**
   * A party link opens the party, not just the page.
   *
   * The tab is this component's to choose, so arriving on `?party=` switches to
   * it here; redeeming the code belongs to the panel that knows how, and clears
   * the param when it is done. Without this the link lands a student on Shared
   * tests with a code in the address bar and nothing telling them what to do
   * with it — which is not a link, it is a puzzle.
   */
  useEffect(() => {
    if (searchParams.get('party')) setTab('parties')
  }, [searchParams])

  if (openRoomId) {
    return (
      <PageContainer>
        <PageHeader title={t('Study Together')} description={t('Sit the same set of questions as your classmates.')} />
        <RoomRunner roomId={openRoomId} onExit={() => { setOpenRoomId(null); void reloadRooms() }} />
      </PageContainer>
    )
  }

  if (openChallengeId) {
    return (
      <PageContainer>
        <PageHeader title={t('Study Together')} description={t('The same paper, sat separately. The comparison opens once you have both finished.')} />
        <ChallengeRunner challengeId={openChallengeId} onExit={() => { setOpenChallengeId(null); void reloadChallenges() }} />
      </PageContainer>
    )
  }

  async function createRoom() {
    setBusy(true)
    setMessage('')
    const picked = shuffle(available).slice(0, Math.min(count, available.length)).map((question) => question.id)
    const result = await create({ name: name.trim() || t('Shared test'), questionIds: picked, timed, secondsPerQuestion: null })
    setBusy(false)
    if (!result.ok) { setMessage(ROOM_REFUSALS[result.reason ?? ''] ?? t('That test could not be created.')); return }
    setName('')
    await reloadRooms()
    setOpenRoomId(result.room!.id)
  }

  async function joinRoom() {
    setBusy(true)
    setMessage('')
    const result = await join(joinCode.trim())
    setBusy(false)
    if (!result.ok) { setMessage(ROOM_REFUSALS[result.reason ?? ''] ?? t('That code could not be used.')); return }
    setJoinCode('')
    await reloadRooms()
    setOpenRoomId(result.room!.id)
  }

  const open = rooms.filter((room) => room.status !== 'closed')
  const past = rooms.filter((room) => room.status === 'closed')

  const testsContent = !API_MODE ? (
    <Panel className="p-10">
      <EmptyState
        icon={Users}
        title={t('Shared tests need the backend')}
        description={t('A shared test lives on the server so other people can join it by code. Connect the backend to create one.')}
      />
    </Panel>
  ) : (
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={t('Create a shared test')} icon={Plus} />
          <div className="space-y-5 p-5">
            <Field label={t('Name it')}><TextInput value={name} onChange={(event) => setName(event.target.value)} placeholder={t('e.g. Cardiology crunch')} /></Field>

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

            {message && <p role="status" className="text-[12.5px] text-danger">{message}</p>}

            <Button
              variant="primary"
              iconLeft={Plus}
              loading={busy}
              disabled={available.length === 0}
              onClick={() => void createRoom()}
            >
              {available.length === 0 ? t('No questions published yet') : t('Create and get a code')}
            </Button>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title={t('Join with a code')} icon={LogIn} />
            <div className="space-y-3 p-5">
              <TextInput
                value={joinCode}
                onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
                onKeyDown={(event) => { if (event.key === 'Enter') void joinRoom() }}
                placeholder={t('e.g. K7PQR2')}
                className="font-mono tracking-[0.2em]"
                aria-label={t('Shared test code')}
              />
              <Button className="w-full" variant="secondary" iconLeft={LogIn} loading={busy} disabled={joinCode.trim().length < 4} onClick={() => void joinRoom()}>
                {t('Join')}
              </Button>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={t('Your shared tests')} icon={Users} hint={open.length ? `${open.length} ${t('open')}` : undefined} />
            {open.length === 0 ? (
              <p className="px-5 py-6 text-center text-[12.5px] leading-relaxed text-ink-3">{t('No shared test open. Create one, or join with a code.')}</p>
            ) : (
              <ul className="divide-y divide-line">
                {open.map((room) => (
                  <li key={room.id}>
                    <button type="button" onClick={() => setOpenRoomId(room.id)} className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-inset">
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
          </Panel>

          <Panel>
            <PanelHeader title={t('Finished')} icon={Trophy} />
            {past.length === 0 ? (
              <p className="px-5 py-6 text-center text-[12.5px] text-ink-3">{t('Nothing finished yet.')}</p>
            ) : (
              <ul className="divide-y divide-line">
                {past.map((room) => (
                  <li key={room.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ink">{room.name}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-3">
                        {room.members} {room.members === 1 ? t('person') : t('people')} · {formatRelativeTime(room.createdAt)}
                      </span>
                    </span>
                    <span className="tnum shrink-0 font-mono text-[13px] font-medium text-ink">
                      {room.questionCount ? `${Math.round((room.correct / room.questionCount) * 100)}%` : '—'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
  )

  const partiesContent = !API_MODE ? (
    <Panel className="p-10">
      <EmptyState
        icon={Users}
        title={t('Study parties need the backend')}
        description={t('A party lives on the server so the rest of your year can find and join it. Connect the backend to start one.')}
      />
    </Panel>
  ) : (
    <PartiesPanel />
  )

  const friendsContent = !API_MODE ? (
    <Panel className="p-10">
      <EmptyState
        icon={Users}
        title={t('Friends need the backend')}
        description={t('Friend requests live on the server so both people can see them. Connect the backend to add friends.')}
      />
    </Panel>
  ) : (
    <div className="space-y-4">
      {inviteNotice && (
        <p role="status" className={cn('text-[12.5px]', inviteNotice.tone === 'success' ? 'text-success' : 'text-danger')}>
          {inviteNotice.text}
        </p>
      )}
      <ChallengePanel
        challenges={challenges}
        friends={friends}
        onRespond={respondChallenge}
        onOpen={setOpenChallengeId}
      />
      <FriendsPanel
        friends={friends}
        incoming={incoming}
        outgoing={outgoing}
        onRespond={respond}
        onRemove={remove}
        onStudyTogether={handleStudyTogether}
        onChallenge={handleChallenge}
        onCreateInvite={mintInvite}
        onRequest={request}
        onSearchDirectory={searchDirectory}
      />
    </div>
  )

  return (
    <PageContainer>
      <PageHeader
        title={t('Study Together')}
        description={API_MODE ? t('Sit the same set of questions as your classmates, then compare results.') : t('Sit the same set of questions as your classmates.')}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={tab}
          onChange={(value) => setTab(value as 'tests' | 'friends' | 'parties')}
          items={[
            { value: 'tests', label: t('Shared tests') },
            { value: 'parties', label: t('Parties') },
            { value: 'friends', label: t('Friends') },
          ]}
        />
        {/* One row rather than one button per game: all three are the same
            invitation — a fresh seed and a link — so they read as one family
            of actions, not three separate features competing for space. */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" iconLeft={Grid3x3} onClick={handlePlayTermGrid}>
            {t('Term Grid')}
          </Button>
          <Button variant="secondary" iconLeft={Crosshair} onClick={handlePlaySpotter}>
            {t('Spotter')}
          </Button>
          <Button variant="secondary" iconLeft={Shuffle} onClick={handlePlayTermMatch}>
            {t('Term Match')}
          </Button>
        </div>
      </div>

      {tab === 'tests' ? testsContent : tab === 'parties' ? partiesContent : friendsContent}

      {challengeTarget && (
        <ChallengeDialog
          friend={challengeTarget}
          pool={questions}
          onClose={() => setChallengeTarget(null)}
          onCreate={createChallenge}
          onCreated={(challengeId) => {
            setChallengeTarget(null)
            void reloadChallenges()
            setOpenChallengeId(challengeId)
          }}
        />
      )}
    </PageContainer>
  )
}
