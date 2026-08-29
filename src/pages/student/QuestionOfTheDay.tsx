import { useEffect, useState } from 'react'
import { Check, Flame, Share2, Trophy, Users, X } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Avatar } from '@/components/ui/Avatar'
import { QuestionView } from '@/components/qbank/QuestionView'
import { useQotd } from '@/lib/useQotd'
import { useIdentity } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'
import { API_MODE, apiGet } from '@/lib/api'
import { formatLongDate } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { QotdFriendsResponse, QotdLeaderboardResponse } from '@/data/qotdTypes'

/**
 * Question of the Day — one question, answered once, on its own progress
 * track. The question body itself is the shared `QuestionView` (the same
 * renderer the question bank and shared tests use) so a QotD item looks and
 * behaves exactly like it does everywhere else; only the surrounding page —
 * streak, cohort leaderboard, friends, share — is unique to this surface.
 */

function useQotdLeaderboard(refreshKey: number) {
  const [data, setData] = useState<QotdLeaderboardResponse | null>(null)
  const [loading, setLoading] = useState(API_MODE)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    if (!API_MODE) { setLoading(false); return }
    setLoading(true)
    setFailed(false)
    apiGet<QotdLeaderboardResponse>('/qotd/leaderboard')
      .then((next) => { if (alive) setData(next) })
      .catch(() => { if (alive) { setData(null); setFailed(true) } })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [refreshKey])

  return { data, loading, failed }
}

function useQotdFriends(refreshKey: number) {
  const [data, setData] = useState<QotdFriendsResponse | null>(null)
  const [loading, setLoading] = useState(API_MODE)

  useEffect(() => {
    let alive = true
    if (!API_MODE) { setLoading(false); return }
    setLoading(true)
    apiGet<QotdFriendsResponse>('/qotd/friends')
      .then((next) => { if (alive) setData(next) })
      .catch(() => { if (alive) setData(null) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [refreshKey])

  return { data, loading }
}

function QotdLeaderboardPanel({
  data,
  loading,
  failed,
  viewerId,
}: {
  data: QotdLeaderboardResponse | null
  loading: boolean
  failed: boolean
  viewerId: string | null
}) {
  const t = useT()

  if (!API_MODE) {
    return (
      <Panel>
        <PanelHeader title={t('Cohort leaderboard')} icon={Trophy} />
        <p className="p-5 text-[12.5px] leading-relaxed text-ink-3">{t('Sign in to compare with your cohort.')}</p>
      </Panel>
    )
  }

  return (
    <Panel>
      <PanelHeader
        title={t('Cohort leaderboard')}
        icon={Trophy}
        hint={data?.scope ? [data.scope.universityId, data.scope.year].filter(Boolean).join(' · ') : undefined}
      />
      {loading ? (
        <div className="space-y-2 p-5" aria-label={t('Loading leaderboard')}>
          {[0, 1, 2].map((row) => <div key={row} className="h-10 animate-pulse rounded-lg bg-inset motion-reduce:animate-none" />)}
        </div>
      ) : failed || !data || data.rows.length === 0 ? (
        <div className="p-8">
          <EmptyState icon={Trophy} title={t('No ranking yet')} description={t('The board appears once your cohort starts answering.')} />
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <Tr>
                <Th className="w-10">#</Th>
                <Th>{t('Student')}</Th>
                <Th align="end">{t('Streak')}</Th>
                <Th align="end" className="pr-4">{t('Correct')}</Th>
              </Tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <Tr key={row.userId} hover className={row.userId === viewerId ? 'bg-primary-tint/25' : undefined}>
                  <Td className="tnum font-mono text-ink-3">{row.rank}</Td>
                  <Td>
                    <span className="inline-flex items-center gap-2 font-medium text-ink">
                      <Avatar name={row.username} size="sm" />
                      @{row.username}
                    </span>
                  </Td>
                  <Td align="end" className="tnum font-mono font-semibold text-ink">🔥 {row.current}</Td>
                  <Td align="end" className="tnum pr-4 font-mono text-ink-3">{row.totalCorrect}/{row.totalAnswered}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          {data.viewer.rank != null && (
            <p className="border-t border-line px-4 py-2.5 text-[11.5px] text-ink-3">
              {t('Your rank')}: #{data.viewer.rank} {t('of')} {data.viewer.total}
            </p>
          )}
        </>
      )}
    </Panel>
  )
}

function QotdFriendsPanel({ data, loading }: { data: QotdFriendsResponse | null; loading: boolean }) {
  const t = useT()

  if (!API_MODE) {
    return (
      <Panel>
        <PanelHeader title={t('Friends')} icon={Users} />
        <p className="p-5 text-[12.5px] leading-relaxed text-ink-3">{t('Sign in to compare with friends.')}</p>
      </Panel>
    )
  }

  return (
    <Panel>
      <PanelHeader title={t('Friends')} icon={Users} />
      {loading ? (
        <div className="space-y-2 p-5" aria-label={t('Loading friends')}>
          {[0, 1].map((row) => <div key={row} className="h-10 animate-pulse rounded-lg bg-inset motion-reduce:animate-none" />)}
        </div>
      ) : !data || data.friends.length === 0 ? (
        <div className="p-8">
          <EmptyState icon={Users} title={t('No friends yet')} description={t('Add friends to compare today’s streaks.')} />
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {data.friends.map((friend) => (
            <li key={friend.userId} className="flex items-center gap-3 px-4 py-2.5">
              <Avatar name={friend.name} size="sm" />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{friend.name}</span>
              {friend.answered ? (
                friend.correct === null ? (
                  <Badge tone="neutral">{t('Answered')}</Badge>
                ) : (
                  <Icon icon={friend.correct ? Check : X} size={16} className={friend.correct ? 'text-success' : 'text-danger'} />
                )
              ) : (
                <span className="text-[11.5px] text-ink-3">{t('Not yet')}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}

export function QuestionOfTheDay() {
  const t = useT()
  const identity = useIdentity()
  const qotd = useQotd()
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [copied, setCopied] = useState(false)

  const { data: leaderboard, loading: leaderboardLoading, failed: leaderboardFailed } = useQotdLeaderboard(refreshKey)
  const { data: friends, loading: friendsLoading } = useQotdFriends(refreshKey)

  async function handleChoose(index: number) {
    if (qotd.answered || busy) return
    setPendingIndex(index)
    setBusy(true)
    try {
      await qotd.answer(index)
      // The friends/leaderboard reads happen once on mount; re-run them once
      // this answer has landed so today's row and rank reflect it right away.
      setRefreshKey((key) => key + 1)
    } finally {
      setBusy(false)
    }
  }

  async function handleShare() {
    // No question text and no correct option — only the streak, so a share
    // never spoils today's question for the friend who opens it next.
    const shareText = t('Got today’s Synapse question — {count}-day streak 🔥').replace('{count}', String(qotd.current))
    const shareUrl = `${window.location.origin}/app/qotd`
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ text: shareText, url: shareUrl })
        return
      } catch {
        // Cancelled or unsupported mid-call — fall back to copying instead.
      }
    }
    try {
      await navigator.clipboard?.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // No clipboard access (e.g. insecure context) — nothing more to offer.
    }
  }

  const chosen = qotd.answered ? qotd.answerIndex : pendingIndex
  const correctIndex = qotd.question ? qotd.question.options.findIndex((option) => option.correct) : undefined

  return (
    <PageContainer>
      <PageHeader
        title={t('Question of the Day')}
        description={formatLongDate(new Date())}
        actions={<Badge tone="primary" dot>{`🔥 ${qotd.current}`}</Badge>}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader
            title={t('Today’s question')}
            icon={Flame}
            hint={qotd.longest > 0 ? `${t('Longest streak')}: ${qotd.longest}` : undefined}
          />
          <div className="p-5">
            {qotd.loading ? (
              <div className="space-y-3" aria-label={t('Loading')}>
                <div className="h-4 w-2/3 animate-pulse rounded bg-inset motion-reduce:animate-none" />
                <div className="h-24 animate-pulse rounded-lg bg-inset motion-reduce:animate-none" />
              </div>
            ) : !qotd.question ? (
              <EmptyState
                icon={Flame}
                title={t('Nothing to answer right now')}
                description={t('There is no question available for your cohort yet. Check back soon.')}
              />
            ) : (
              <>
                <QuestionView
                  question={qotd.question}
                  chosen={chosen}
                  revealed={qotd.answered}
                  correctIndex={correctIndex}
                  onChoose={(index) => { void handleChoose(index) }}
                />

                {qotd.answered && qotd.question.explanation && (
                  <div className="mt-5 rounded-xl border border-line bg-inset/60 p-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Explanation')}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{qotd.question.explanation}</p>
                  </div>
                )}

                {qotd.answered && (
                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                    <p className={cn('text-[13px] font-medium', qotd.correct ? 'text-success' : 'text-danger')}>
                      {qotd.correct ? t('Correct.') : t('Not this time.')}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      iconLeft={Share2}
                      onClick={() => { void handleShare() }}
                      className="ms-auto"
                    >
                      {copied ? t('Copied') : t('Share result')}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </Panel>

        <div className="flex flex-col gap-4">
          <QotdLeaderboardPanel data={leaderboard} loading={leaderboardLoading} failed={leaderboardFailed} viewerId={identity.userId} />
          <QotdFriendsPanel data={friends} loading={friendsLoading} />
        </div>
      </div>
    </PageContainer>
  )
}
