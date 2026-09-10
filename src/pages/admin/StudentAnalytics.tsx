import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity, BookOpenCheck, BrainCircuit, CalendarClock, ChartColumnBig, Clock, Cpu,
  GraduationCap, Layers, MonitorSmartphone, RefreshCw, Target, TicketPercent, TrendingDown,
  Users, WalletCards,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Stat } from '@/components/ui/Stat'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { API_MODE, apiGet } from '@/lib/api'

// ── Response shape (mirrors server/src/studentAnalytics.js) ─────────────────
interface Slice { label: string; count: number }
interface TopicStat { label: string; attempts: number; accuracy: number | null }
interface DayPoint { day: string; [key: string]: number | string }

interface Analytics {
  generatedAt: string
  audience: {
    totalStudents: number; activeStudents: number; signups30d: number; signups90d: number
    signupTrend: DayPoint[]; byUniversity: Slice[]; byYear: Slice[]; byPlan: Slice[]; byStatus: Slice[]
  }
  engagement: {
    attempts: { d1: number; d7: number; d30: number; total: number }
    activeAnswerers: { d1: number; d7: number; d30: number }
    sessions30d: number; attemptTrend: DayPoint[]
    studyMinutes: { d7: number; d30: number; users30d: number }; studyTrend: DayPoint[]
    assistant30d: { messages: number; users: number; tokens: number; fallbacks: number }
  }
  performance: {
    totalAttempts: number; accuracy: number | null; avgSeconds: number | null; overtimeAttempts: number
    accuracyTrend: DayPoint[]; bySubject: TopicStat[]; hardestTopics: TopicStat[]; topTopics: TopicStat[]
  }
  retention: { activeToday: number; active7d: number; active30d: number; dormant: number; neverAnswered: number }
  monetization: { activeSubscriptions: number; trialing: number; bySource: Slice[]; byPlan: Slice[]; redemptions30d: number }
  platform: { byPlatform: Slice[]; byAppVersion: Slice[]; byLocale: Slice[] }
}

const whole = (n: number | null | undefined) => Number(n ?? 0).toLocaleString()
const pct = (v: number | null | undefined) => v == null ? '—' : `${Math.round(v * 100)}%`
const secs = (v: number | null | undefined) => v == null ? '—' : `${Math.round(v)}s`
const when = (iso: string | null | undefined) => iso ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)) : '—'

/** A horizontal bar list: the app already meters storage this way. */
function Distribution({ rows, tone = 'primary', unit }: { rows: Slice[]; tone?: 'primary' | 'warning' | 'success'; unit?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.count))
  if (!rows.length) return <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">No data yet.</p>
  return (
    <div className="space-y-2.5 p-4">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-[12.5px]">
            <span className="min-w-0 truncate text-ink-2">{row.label}</span>
            <span className="tnum shrink-0 font-mono text-ink">{whole(row.count)}{unit ? ` ${unit}` : ''}</span>
          </div>
          <Meter value={(row.count / max) * 100} tone={tone} />
        </div>
      ))}
    </div>
  )
}

/** A minimal inline sparkline — no charting dependency for one trend line. */
function Spark({ points, tone = 'var(--primary)' }: { points: number[]; tone?: string }) {
  if (points.length < 2) return null
  const max = Math.max(1, ...points)
  const w = 100, h = 28
  const d = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-8 w-full" aria-hidden>
      <polyline points={d} fill="none" stroke={tone} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function TopicTable({ rows, caption }: { rows: TopicStat[]; caption: string }) {
  return (
    <Table>
      <thead><tr><Th className="pl-4">{caption}</Th><Th align="end">Attempts</Th><Th align="end" className="pr-4">Accuracy</Th></tr></thead>
      <tbody>
        {rows.length === 0 && <Tr><Td className="pl-4 text-ink-3" colSpan={3}>No data yet.</Td></Tr>}
        {rows.map((row) => (
          <Tr key={row.label}>
            <Td className="pl-4 text-ink">{row.label}</Td>
            <Td align="end" className="tnum font-mono text-ink-2">{whole(row.attempts)}</Td>
            <Td align="end" className="tnum pr-4 font-mono text-ink">{pct(row.accuracy)}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}

// Everything the platform collects on a student, whether or not it is charted
// above. This is the honest answer to "report ALL we can collect": each row is
// a real server-owned field, with where it comes from.
const DATA_CATALOG: Array<{ group: string; fields: string; source: string }> = [
  { group: 'Identity & enrolment', fields: 'name, email, phone, nationality, university, year, group, plan, status, joined date', source: 'students' },
  { group: 'Session & activity', fields: 'last active, questions answered, rolling accuracy, exam readiness', source: 'students (server rollup)' },
  { group: 'Question attempts', fields: 'per-question correctness, chosen vs correct option, seconds taken, session duration, overtime, university/year/term/subject/topic/subtopic/concepts, timestamp', source: 'qbank_attempts' },
  { group: 'Study time', fields: 'server-clocked active minutes by module, subject and surface', source: 'maristana_study_minutes' },
  { group: 'AI assistant', fields: 'messages, input/output tokens, model fallbacks, per day and plan', source: 'assistant_usage' },
  { group: 'Subscriptions', fields: 'plan, status, source (payment/voucher/manual/trial), start, expiry, cancellations', source: 'subscriptions' },
  { group: 'Vouchers', fields: 'codes redeemed and released, per student', source: 'voucher_redemptions' },
  { group: 'Devices', fields: 'platform, app version, locale, last seen (push tokens)', source: 'device_tokens' },
  { group: 'Social & gamification', fields: 'study rooms, study parties, challenges, friendships, Maristana hospitals', source: 'study_room_*, study_party_*, challenges, friendships' },
  { group: 'Content authored by students', fields: 'notebooks, whiteboards, shared documents, stars, follows, storage bytes', source: 'user_documents, shared_documents' },
  { group: 'Communications', fields: 'outbound email sent/delivered/problems, unsubscribe categories', source: 'emails, email_suppressions' },
  { group: 'Account audit', fields: 'role changes, access changes, enrolment changes, deletions — with actor and reason', source: 'account_action_audit, enrollment_change_requests' },
]

// A small, deterministic demo so the page renders in preview / demo mode.
function demoAnalytics(): Analytics {
  const trend = (base: number, spread: number): DayPoint[] =>
    Array.from({ length: 30 }, (_, i) => ({ day: `d${i}`, count: Math.round(base + Math.sin(i / 3) * spread + i) }))
  return {
    generatedAt: new Date().toISOString(),
    audience: {
      totalStudents: 4820, activeStudents: 3140, signups30d: 412, signups90d: 1180,
      signupTrend: trend(10, 6),
      byUniversity: [{ label: 'Kasr Al-Ainy', count: 1620 }, { label: 'Alexandria', count: 980 }, { label: 'Ain Shams', count: 720 }, { label: 'Mansoura', count: 540 }, { label: 'Helwan', count: 410 }],
      byYear: [{ label: 'Year 1', count: 1900 }, { label: 'Year 2', count: 1240 }, { label: 'Year 3', count: 980 }, { label: 'Year 4', count: 700 }],
      byPlan: [{ label: 'All-access', count: 2600 }, { label: 'Free', count: 1900 }, { label: 'Trial', count: 320 }],
      byStatus: [{ label: 'Active', count: 3140 }, { label: 'Inactive', count: 1680 }],
    },
    engagement: {
      attempts: { d1: 5400, d7: 38900, d30: 162000, total: 1240000 },
      activeAnswerers: { d1: 640, d7: 2100, d30: 3140 },
      sessions30d: 21400,
      attemptTrend: trend(4200, 1400).map((p) => ({ ...p, attempts: p.count, users: Math.round(Number(p.count) / 12) })),
      studyMinutes: { d7: 84000, d30: 356000, users30d: 2980 },
      studyTrend: trend(9000, 3000).map((p) => ({ ...p, minutes: p.count })),
      assistant30d: { messages: 48200, users: 1870, tokens: 21400000, fallbacks: 210 },
    },
    performance: {
      totalAttempts: 1240000, accuracy: 0.68, avgSeconds: 41, overtimeAttempts: 96000,
      accuracyTrend: trend(60, 8).map((p) => ({ ...p, accuracy: Number(p.count) / 100 })),
      bySubject: [{ label: 'Anatomy', attempts: 210000, accuracy: 0.71 }, { label: 'Physiology', attempts: 184000, accuracy: 0.66 }, { label: 'Biochemistry', attempts: 141000, accuracy: 0.63 }],
      hardestTopics: [{ label: 'Acid–base balance', attempts: 8400, accuracy: 0.44 }, { label: 'Brachial plexus', attempts: 7600, accuracy: 0.48 }, { label: 'Glycolysis regulation', attempts: 9100, accuracy: 0.51 }],
      topTopics: [{ label: 'Cardiac cycle', attempts: 22400, accuracy: 0.73 }, { label: 'Cranial nerves', attempts: 19800, accuracy: 0.69 }, { label: 'Nephron function', attempts: 18100, accuracy: 0.64 }],
    },
    retention: { activeToday: 640, active7d: 2100, active30d: 3140, dormant: 1680, neverAnswered: 520 },
    monetization: {
      activeSubscriptions: 2600, trialing: 320,
      bySource: [{ label: 'payment', count: 1900 }, { label: 'voucher', count: 520 }, { label: 'manual', count: 120 }, { label: 'trial', count: 380 }],
      byPlan: [{ label: 'All-access annual', count: 1800 }, { label: 'All-access term', count: 800 }],
      redemptions30d: 214,
    },
    platform: {
      byPlatform: [{ label: 'ios', count: 1240 }],
      byAppVersion: [{ label: '1.4.0', count: 720 }, { label: '1.3.2', count: 380 }, { label: '1.3.0', count: 140 }],
      byLocale: [{ label: 'ar-EG', count: 880 }, { label: 'en-US', count: 360 }],
    },
  }
}

export function StudentAnalytics() {
  const [data, setData] = useState<Analytics | null>(() => API_MODE ? null : demoAnalytics())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!API_MODE) return
    setLoading(true); setError('')
    try {
      setData(await apiGet<Analytics>('/admin/analytics'))
    } catch {
      setError('Could not load analytics from the live backend.')
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => { void load() }, [load])

  const a = data
  const signupSpark = useMemo(() => (a?.audience.signupTrend ?? []).map((p) => Number(p.count)), [a])
  const attemptSpark = useMemo(() => (a?.engagement.attemptTrend ?? []).map((p) => Number(p.attempts)), [a])

  const retentionRows: Array<{ label: string; value: number; icon: LucideIcon; tone: 'success' | 'warning' | 'primary' }> = [
    { label: 'Active today', value: a?.retention.activeToday ?? 0, icon: Activity, tone: 'success' },
    { label: 'Active this week', value: a?.retention.active7d ?? 0, icon: CalendarClock, tone: 'success' },
    { label: 'Active this month', value: a?.retention.active30d ?? 0, icon: CalendarClock, tone: 'primary' },
    { label: 'Dormant (30d+)', value: a?.retention.dormant ?? 0, icon: TrendingDown, tone: 'warning' },
    { label: 'Never answered a question', value: a?.retention.neverAnswered ?? 0, icon: TrendingDown, tone: 'warning' },
  ]

  return (
    <PageContainer>
      <PageHeader
        title="Student Analytics"
        description="Everything the platform measures about its students — engagement, performance, retention and monetization — from server-verified activity."
        actions={
          <>
            {!API_MODE && <Badge tone="primary" dot>Demo data</Badge>}
            <Button size="sm" variant="secondary" iconLeft={RefreshCw} loading={loading} onClick={() => API_MODE ? void load() : setData(demoAnalytics())}>
              {API_MODE ? 'Refresh' : 'Reset demo'}
            </Button>
          </>
        }
      />

      {error && <Panel className="mb-4 border-warning/40 bg-warning-tint px-4 py-3 text-[13px] text-warning">{error}</Panel>}

      {/* Headline */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total students" value={whole(a?.audience.totalStudents)} sub={`${whole(a?.audience.signups30d)} joined in 30d`} icon={Users} />
        <Stat label="Active answerers" value={whole(a?.engagement.activeAnswerers.d30)} sub="last 30 days" icon={Activity} />
        <Stat label="Overall accuracy" value={pct(a?.performance.accuracy)} sub={`${whole(a?.performance.totalAttempts)} attempts`} icon={Target} />
        <Stat label="Active subscriptions" value={whole(a?.monetization.activeSubscriptions)} sub={`${whole(a?.monetization.trialing)} on trial`} icon={WalletCards} />
      </div>

      {/* Engagement rhythm */}
      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Panel>
          <PanelHeader title="Daily active answerers" icon={Activity} hint="DAU / WAU / MAU" />
          <div className="grid grid-cols-3 gap-2 p-4">
            {[['Today', a?.engagement.activeAnswerers.d1], ['7 days', a?.engagement.activeAnswerers.d7], ['30 days', a?.engagement.activeAnswerers.d30]].map(([label, v]) => (
              <div key={String(label)} className="rounded-lg border border-line bg-surface-2 px-3 py-2.5">
                <p className="tnum font-mono text-[20px] font-semibold text-ink">{whole(v as number)}</p>
                <p className="text-[11.5px] text-ink-3">{label}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Question attempts" icon={BookOpenCheck} hint="last 30 days" />
          <div className="p-4">
            <p className="tnum font-mono text-[24px] font-semibold text-ink">{whole(a?.engagement.attempts.d30)}</p>
            <p className="mb-2 text-[11.5px] text-ink-3">{whole(a?.engagement.sessions30d)} sessions · {whole(a?.engagement.attempts.total)} all-time</p>
            <Spark points={attemptSpark} />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="New signups" icon={GraduationCap} hint="last 30 days" />
          <div className="p-4">
            <p className="tnum font-mono text-[24px] font-semibold text-ink">{whole(a?.audience.signups30d)}</p>
            <p className="mb-2 text-[11.5px] text-ink-3">{whole(a?.audience.signups90d)} in 90 days</p>
            <Spark points={signupSpark} tone="var(--success, #16a34a)" />
          </div>
        </Panel>
      </div>

      {/* Study time + AI */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Study minutes (30d)" value={whole(a?.engagement.studyMinutes.d30)} sub={`${whole(a?.engagement.studyMinutes.users30d)} students`} icon={Clock} />
        <Stat label="Study minutes (7d)" value={whole(a?.engagement.studyMinutes.d7)} sub="server-clocked" icon={Clock} />
        <Stat label="AI messages (30d)" value={whole(a?.engagement.assistant30d.messages)} sub={`${whole(a?.engagement.assistant30d.users)} users`} icon={BrainCircuit} />
        <Stat label="AI tokens (30d)" value={whole(a?.engagement.assistant30d.tokens)} sub={`${whole(a?.engagement.assistant30d.fallbacks)} fallbacks`} icon={Cpu} />
      </div>

      {/* Performance */}
      <div className="mb-4 grid gap-4 xl:grid-cols-2">
        <Panel className="overflow-hidden">
          <PanelHeader title="Hardest topics" icon={TrendingDown} hint="lowest accuracy, ≥20 attempts" />
          <TopicTable rows={a?.performance.hardestTopics ?? []} caption="Topic" />
        </Panel>
        <Panel className="overflow-hidden">
          <PanelHeader title="Most-attempted topics" icon={Target} hint="by volume" />
          <TopicTable rows={a?.performance.topTopics ?? []} caption="Topic" />
        </Panel>
      </div>
      <div className="mb-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel className="overflow-hidden">
          <PanelHeader title="Accuracy by subject" icon={ChartColumnBig} hint={`avg ${secs(a?.performance.avgSeconds)}/question · ${whole(a?.performance.overtimeAttempts)} overtime`} />
          <TopicTable rows={a?.performance.bySubject ?? []} caption="Subject" />
        </Panel>
        <Panel>
          <PanelHeader title="Retention" icon={CalendarClock} />
          <div className="grid gap-2 p-4">
            {retentionRows.map((row) => (
              <div key={row.label} className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2">
                <Icon icon={row.icon} size={16} className="text-ink-3" />
                <span className="min-w-0 flex-1 text-[13px] text-ink-2">{row.label}</span>
                <Badge tone={row.tone}>{whole(row.value)}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Audience breakdowns */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Panel><PanelHeader title="By university" icon={GraduationCap} /><Distribution rows={a?.audience.byUniversity ?? []} /></Panel>
        <Panel><PanelHeader title="By year" icon={Layers} /><Distribution rows={a?.audience.byYear ?? []} tone="success" /></Panel>
        <Panel><PanelHeader title="By plan" icon={WalletCards} /><Distribution rows={a?.audience.byPlan ?? []} /></Panel>
        <Panel><PanelHeader title="By status" icon={Users} /><Distribution rows={a?.audience.byStatus ?? []} tone="warning" /></Panel>
      </div>

      {/* Monetization + platform */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Panel><PanelHeader title="Subscriptions by source" icon={WalletCards} /><Distribution rows={a?.monetization.bySource ?? []} tone="success" /></Panel>
        <Panel><PanelHeader title="Plans" icon={TicketPercent} hint={`${whole(a?.monetization.redemptions30d)} voucher redemptions (30d)`} /><Distribution rows={a?.monetization.byPlan ?? []} /></Panel>
        <Panel><PanelHeader title="Devices by version" icon={MonitorSmartphone} /><Distribution rows={a?.platform.byAppVersion ?? []} /></Panel>
        <Panel><PanelHeader title="Devices by locale" icon={MonitorSmartphone} /><Distribution rows={a?.platform.byLocale ?? []} tone="warning" /></Panel>
      </div>

      {/* The full menu of collectable data */}
      <Panel className="overflow-hidden">
        <PanelHeader title="Everything we collect on a student" icon={ChartColumnBig} hint={a ? `Generated ${when(a.generatedAt)}` : 'Loading…'} />
        <Table>
          <thead><tr><Th className="pl-4">Category</Th><Th>Fields</Th><Th className="pr-4">Source</Th></tr></thead>
          <tbody>
            {DATA_CATALOG.map((row) => (
              <Tr key={row.group}>
                <Td className="pl-4 font-medium text-ink">{row.group}</Td>
                <Td className="text-ink-2">{row.fields}</Td>
                <Td className="pr-4 font-mono text-[12px] text-ink-3">{row.source}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
