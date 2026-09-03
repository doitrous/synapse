import { useMemo, useState } from 'react'
import { ChevronDown, History, Lightbulb, Repeat, Target } from 'lucide-react'
import { bySession, sessionDetail, type SessionDetail, type SessionSummary } from '@/data/attemptStats'
import type { AttemptRecord } from '@/data/attempts'
import type { PaceBand } from '@/data/qbankSession'
import { useSubjectName } from '@/lib/useSubjectName'
import { SubjectDot } from '@/components/ui/Subject'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { ButtonLink } from '@/components/ui/Button'
import { formatMinutes } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * How many recent sittings the ledger shows.
 *
 * The full history — rename, retake, delete — already lives on the Question
 * Bank's "Previous tests" panel. This is a compact, read-only echo of the same
 * real sessions for the Performance page: enough to spot a pattern, not a
 * second place to manage them.
 */
const RECENT_LIMIT = 6

/** Sessions needed before "repeated weakness" means anything. */
const REPEAT_WINDOW = 5

const SURFACE_LABEL: Record<string, string> = {
  qbank: 'Question bank', essay: 'Written questions', room: 'Shared test',
  case: 'Clinical case', lab: 'Lab & imaging', station: 'OSCE station', card: 'Flashcards',
}

const PACE_TONE: Record<PaceBand, string> = {
  good: 'bg-success', target: 'bg-primary', slower: 'bg-warning', overtime: 'bg-danger',
}

function shortDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(iso))
}

function clock(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function sessionTitle(session: SessionSummary, subjectName: (id: string) => string): string {
  const surface = SURFACE_LABEL[session.surface] ?? session.surface
  if (!session.subjectIds.length) return surface
  const first = subjectName(session.subjectIds[0])
  return session.subjectIds.length > 1 ? `${first} + ${session.subjectIds.length - 1}` : first
}

function paceMix({ pace }: SessionDetail) {
  const total = pace.good + pace.target + pace.slower + pace.overtime
  if (!total) return null
  return (
    <div className="flex h-2 w-16 overflow-hidden rounded-full bg-inset" aria-hidden>
      {(Object.keys(pace) as PaceBand[]).map((band) => pace[band] > 0 && (
        <span key={band} className={PACE_TONE[band]} style={{ width: `${(pace[band] / total) * 100}%` }} />
      ))}
    </div>
  )
}

/**
 * The one repeated weak spot across the last few sittings, or null.
 *
 * A topic missed once is just a wrong answer — already listed under that
 * session's own misses. This only fires when the same topic cost marks in at
 * least two of the recent sittings, which is what makes it worth flagging
 * ahead of the rest.
 */
function repeatedWeakness(records: AttemptRecord[], window: SessionSummary[]): { topic: string; count: number; of: number } | null {
  if (window.length < 2) return null
  const counts = new Map<string, number>()
  for (const session of window) {
    const missed = new Set(sessionDetail(records, session.sessionId).missed.map((topic) => topic.key))
    for (const topic of missed) counts.set(topic, (counts.get(topic) ?? 0) + 1)
  }
  let best: [string, number] | null = null
  for (const entry of counts) if (entry[1] >= 2 && (!best || entry[1] > best[1])) best = entry
  return best ? { topic: best[0], count: best[1], of: window.length } : null
}

function nextAction(t: (key: string) => string, detail: SessionDetail): string {
  if (detail.repeatedWeaknesses.length) {
    return `${t('Revisit')} ${detail.repeatedWeaknesses[0]} ${t('— it has cost marks more than once.')}`
  }
  if (detail.weakestTopic) return `${t('Review')} ${detail.weakestTopic.key} ${t('while the reasoning is still fresh.')}`
  if (detail.wrong > 0) return t('Revisit the misses from your last session before starting something new.')
  return t('Your last session was clean. Keep the spacing effect and revisit it later rather than repeating it now.')
}

function ExpandedRow({ detail }: { detail: SessionDetail }) {
  const t = useT()
  const mix = paceMix(detail)
  return (
    <div className="border-b border-line bg-surface-2/40 px-4 py-3.5 sm:px-5">
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
        <div><p className="text-ink-3">{t('Right')}</p><p className="tnum font-mono text-[15px] font-semibold text-success">{detail.correct}</p></div>
        <div><p className="text-ink-3">{t('Wrong')}</p><p className="tnum font-mono text-[15px] font-semibold text-danger">{detail.wrong}</p></div>
        {detail.unmarked > 0 && <div><p className="text-ink-3">{t('Unmarked')}</p><p className="tnum font-mono text-[15px] font-semibold text-ink">{detail.unmarked}</p></div>}
        {detail.medianSeconds != null && <div><p className="text-ink-3">{t('Median / question')}</p><p className="tnum font-mono text-[15px] font-semibold text-ink">{detail.medianSeconds}s</p></div>}
        {detail.averageSeconds != null && <div><p className="text-ink-3">{t('Average / question')}</p><p className="tnum font-mono text-[15px] font-semibold text-ink">{detail.averageSeconds}s</p></div>}
        {detail.overtimeSeconds > 0 && <div><p className="text-ink-3">{t('Overtime')}</p><p className="tnum font-mono text-[15px] font-semibold text-danger">+{clock(detail.overtimeSeconds)}</p></div>}
        {mix && (
          <div className="min-w-[7rem]">
            <p className="text-ink-3">{t('Pace mix')}</p>
            <div className="mt-1.5">{mix}</div>
          </div>
        )}
      </div>

      {detail.missed.length > 0 && (
        <div className="mt-3.5 border-t border-line pt-3">
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Where you lost marks')}</p>
          <div className="flex flex-wrap gap-1.5">
            {detail.missed.slice(0, 6).map((topic) => (
              <span key={topic.key} className="inline-flex items-center gap-1.5 rounded-full border border-danger/25 bg-danger-tint/60 px-2.5 py-0.5 text-[11px] text-ink-2">
                {topic.key}
                <span className="tnum font-mono text-[10.5px] text-danger">{topic.marked - topic.correct}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-3.5 border-t border-line pt-3 text-[12px] leading-relaxed text-ink-2">
        <Icon icon={Lightbulb} size={13} className="me-1 inline text-primary" />
        {nextAction(t, detail)}
      </p>
    </div>
  )
}

/**
 * A compact, real-data echo of the student's recent sittings.
 *
 * Every figure here is `bySession`/`sessionDetail` reading the same attempt
 * log the rest of this page already uses — nothing invented, nothing from a
 * cohort. Managing a session (rename, retake, delete) stays on the Question
 * Bank's own "Previous tests" panel; this view is for spotting a pattern at a
 * glance.
 */
export function SessionLedgerPanel({ records }: { records: AttemptRecord[] }) {
  const t = useT()
  const subjectName = useSubjectName()
  const [expanded, setExpanded] = useState<string | null>(null)

  const summaries = useMemo(() => bySession(records), [records])
  const visible = summaries.slice(0, RECENT_LIMIT)
  const window = summaries.slice(0, REPEAT_WINDOW)

  const weakness = useMemo(() => repeatedWeakness(records, window), [records, window])
  const best = useMemo(
    () => summaries.filter((session) => session.accuracy != null).reduce<SessionSummary | null>(
      (top, session) => (!top || session.accuracy! > top.accuracy! ? session : top), null,
    ),
    [summaries],
  )
  const totalSeconds = useMemo(() => summaries.reduce((sum, session) => sum + session.seconds, 0), [summaries])
  const latestDetail = useMemo(
    () => (summaries.length ? sessionDetail(records, summaries[0].sessionId) : null),
    [records, summaries],
  )

  return (
    <Panel>
      <PanelHeader title={t('Session ledger')} icon={History} hint={t('Your recent sittings, in the detail you took them')} />

      {summaries.length === 0 ? (
        <div className="p-10">
          <EmptyState icon={History} title={t('No sessions yet')} description={t('Finish a timed block in the Question bank and it will be logged here, question by question.')} />
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line">
            {visible.map((session) => {
              const isOpen = expanded === session.sessionId
              const detail = isOpen ? sessionDetail(records, session.sessionId) : null
              return (
                <li key={session.sessionId}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : session.sessionId)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 text-start transition-colors hover:bg-inset/60 sm:px-5"
                  >
                    <Icon icon={ChevronDown} size={15} className={cn('shrink-0 chevron-turn text-ink-3')} open={isOpen} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-ink">{sessionTitle(session, subjectName)}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] text-ink-3">
                        <span className="font-mono">{shortDate(session.startedAt)}</span>
                        <span aria-hidden>·</span>
                        <span>{session.answered} {session.answered === 1 ? t('question') : t('questions')}</span>
                        {session.subjectIds[0] && (
                          <span className="inline-flex items-center gap-1"><SubjectDot id={session.subjectIds[0]} /></span>
                        )}
                      </p>
                    </div>
                    {session.seconds > 0 && (
                      <span className="tnum hidden font-mono text-[11.5px] text-ink-3 sm:inline">{formatMinutes(Math.round(session.seconds / 60))}</span>
                    )}
                    <span className={cn(
                      'tnum shrink-0 font-mono text-[14px] font-semibold',
                      session.accuracy == null ? 'text-ink-3' : session.accuracy < 0.6 ? 'text-danger' : session.accuracy < 0.8 ? 'text-warning' : 'text-success',
                    )}>
                      {session.accuracy == null ? '—' : `${Math.round(session.accuracy * 100)}%`}
                    </span>
                  </button>
                  {isOpen && detail && <ExpandedRow detail={detail} />}
                </li>
              )
            })}
          </ul>

          <div className="grid grid-cols-2 gap-3 border-t border-line p-4 sm:grid-cols-4 sm:p-5">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Sessions')}</p>
              <p className="tnum mt-1 font-mono text-[17px] font-semibold text-ink">{summaries.length}</p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Time logged')}</p>
              <p className="tnum mt-1 font-mono text-[17px] font-semibold text-ink">{formatMinutes(Math.round(totalSeconds / 60))}</p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Best session')}</p>
              <p className="tnum mt-1 font-mono text-[17px] font-semibold text-success">{best?.accuracy != null ? `${Math.round(best.accuracy * 100)}%` : '—'}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3"><Icon icon={Repeat} size={11} />{t('Repeated weakness')}</p>
              <p className="mt-1 truncate text-[13px] font-semibold text-danger">{weakness ? weakness.topic : t('None found')}</p>
              {weakness && <p className="text-[10.5px] text-ink-3">{t('missed in')} {weakness.count} {t('of last')} {weakness.of}</p>}
            </div>
          </div>

          {latestDetail && (latestDetail.wrong > 0 || latestDetail.repeatedWeaknesses.length > 0) && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-primary-tint/25 px-4 py-3 sm:px-5">
              <p className="flex min-w-0 items-center gap-1.5 text-[12px] text-ink-2"><Icon icon={Target} size={13} className="shrink-0 text-primary-strong" />{nextAction(t, latestDetail)}</p>
              <ButtonLink to="/app/qbank" size="sm" variant="secondary">{t('Open Question bank')}</ButtonLink>
            </div>
          )}
        </>
      )}
    </Panel>
  )
}
