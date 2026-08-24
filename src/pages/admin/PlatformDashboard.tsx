import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  BellRing,
  BookOpenCheck,
  CalendarClock,
  Database,
  FileWarning,
  Flag,
  GraduationCap,
  HardDrive,
  ImageOff,
  RefreshCw,
  ShieldCheck,
  UserRoundCheck,
  Users,
  WalletCards,
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
import { API_MODE, apiGet, apiPost } from '@/lib/api'

interface PlatformReport {
  generatedAt: string
  storage: {
    usedBytes: number
    bySource: Record<'resource' | 'notebook' | 'whiteboard', number>
    reachedThresholdGb: number | null
    acknowledgedThresholdGb: number | null
    warning: boolean
    acknowledgedBy: string | null
    acknowledgedAt: string | null
  }
  students: { total: number; active: number; signups30d: number }
  subscriptions: { active: number; revenueCurrency: string; revenue30d: number | null }
  engagement: { verifiedAnswers30d: number; activeAnswerers30d: number }
  verifiedQuestionActivity: { answers30d: number }
  contentHealth: { total: number; published: number; invalid: number }
  mediaBlockedContent: number
  reports: { open: number; total: number }
  pendingEnrollmentChanges: number
  notificationDelivery: { outbound30d: number; problem30d: number }
}

const gb = (bytes: number) => bytes / 1024 / 1024 / 1024
const whole = (value: number | null | undefined) => Number(value ?? 0).toLocaleString()
const egp = (value: number | null | undefined) => value == null ? 'Not connected' : `EGP ${Math.round(value).toLocaleString()}`
const when = (iso: string | null | undefined) => iso ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)) : '—'

function sourceLabel(source: string) {
  if (source === 'notebook') return 'Notebook media'
  if (source === 'whiteboard') return 'Whiteboard media'
  return 'Resource uploads'
}

export function PlatformDashboard() {
  const [report, setReport] = useState<PlatformReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [ackBusy, setAckBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const load = useCallback(async () => {
    if (!API_MODE) return
    setLoading(true)
    setError('')
    try {
      setReport(await apiGet<PlatformReport>('/admin/platform/reports'))
    } catch {
      setError('Could not load platform reports from the live backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void load() }, [load])

  const storageRows = useMemo(() => {
    const bySource = report?.storage.bySource ?? { resource: 0, notebook: 0, whiteboard: 0 }
    const max = Math.max(1, ...Object.values(bySource))
    return Object.entries(bySource).map(([source, bytes]) => ({ source, bytes, max }))
  }, [report])
  const detailRows: Array<{ area: string; signal: string; value: string; icon: LucideIcon }> = [
    { area: 'Students', signal: 'Active / total', value: `${whole(report?.students.active)} / ${whole(report?.students.total)}`, icon: UserRoundCheck },
    { area: 'Subscriptions', signal: 'Active all-access subscriptions', value: whole(report?.subscriptions.active), icon: ShieldCheck },
    { area: 'Revenue', signal: '30-day recognized revenue', value: `${report?.subscriptions.revenueCurrency ?? 'EGP'} · ${egp(report?.subscriptions.revenue30d)}`, icon: WalletCards },
    { area: 'Engagement', signal: 'Active answerers in 30 days', value: whole(report?.engagement.activeAnswerers30d), icon: Activity },
    { area: 'Content health', signal: 'Published / invalid / total', value: `${whole(report?.contentHealth.published)} / ${whole(report?.contentHealth.invalid)} / ${whole(report?.contentHealth.total)}`, icon: FileWarning },
    { area: 'Notifications', signal: 'Outbound / problems in 30 days', value: `${whole(report?.notificationDelivery.outbound30d)} / ${whole(report?.notificationDelivery.problem30d)}`, icon: BellRing },
  ]

  async function acknowledgeStorage() {
    const threshold = report?.storage.reachedThresholdGb
    if (!threshold) return
    setAckBusy(true)
    setNotice('')
    try {
      await apiPost(`/admin/platform/storage-thresholds/${threshold}/ack`, {})
      setNotice(`${threshold} GB storage warning acknowledged globally.`)
      await load()
    } catch {
      setNotice('Could not acknowledge that threshold.')
    } finally {
      setAckBusy(false)
    }
  }

  if (!API_MODE) {
    return (
      <PageContainer>
        <PageHeader title="Operational Reports" description="Live platform health, storage, enrolment, content and delivery reports." />
        <Panel className="px-5 py-10 text-center">
          <Icon icon={Database} size={28} className="mx-auto text-ink-3" />
          <p className="mt-3 font-semibold text-ink">Connect the live backend to view operations.</p>
          <p className="mt-1 text-[13px] text-ink-3">Set VITE_API_BASE so this page can read /api/admin/platform reports.</p>
        </Panel>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Operational Reports"
        description="The admin front door now reports server-owned activity, storage, enrolment, content and delivery signals."
        actions={
          <>
            <Button size="sm" variant="secondary" iconLeft={RefreshCw} loading={loading} onClick={() => void load()}>Refresh</Button>
            <Link to="/admin/content" className="inline-flex h-8 items-center rounded-lg border border-line-2 bg-surface px-2.5 text-[13px] font-semibold text-ink shadow-control hover:bg-surface-2">
              Content Control
            </Link>
          </>
        }
      />

      {error && <Panel className="mb-4 border-warning/40 bg-warning-tint px-4 py-3 text-[13px] text-warning">{error}</Panel>}
      {notice && <Panel className="mb-4 px-4 py-3 text-[13px] text-ink">{notice}</Panel>}

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Active students" value={whole(report?.students.active)} sub={`${whole(report?.students.total)} total`} icon={Users} />
        <Stat label="Signups" value={whole(report?.students.signups30d)} sub="last 30 days" icon={GraduationCap} />
        <Stat label="Active subscriptions" value={whole(report?.subscriptions.active)} sub={egp(report?.subscriptions.revenue30d)} icon={WalletCards} />
        <Stat label="Verified answers" value={whole(report?.verifiedQuestionActivity.answers30d)} sub={`${whole(report?.engagement.activeAnswerers30d)} active answerers`} icon={BookOpenCheck} />
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)]">
        <Panel>
          <PanelHeader
            title="Storage usage"
            icon={HardDrive}
            hint={report ? `${gb(report.storage.usedBytes).toFixed(2)} GB actual stored media` : 'Loading…'}
            action={report?.storage.warning && (
              <Button size="sm" variant="primary" loading={ackBusy} onClick={() => void acknowledgeStorage()}>
                Acknowledge {report.storage.reachedThresholdGb} GB
              </Button>
            )}
          />
          <div className="grid gap-4 p-5 md:grid-cols-[12rem_minmax(0,1fr)]">
            <div className="rounded-xl border border-line bg-inset p-4">
              <p className="text-[12px] text-ink-3">Current threshold</p>
              <p className="tnum mt-1 font-mono text-[28px] font-semibold text-ink">{report?.storage.reachedThresholdGb ?? '—'} GB</p>
              <Badge tone={report?.storage.warning ? 'warning' : 'success'} dot className="mt-2">
                {report?.storage.warning ? 'Needs acknowledgement' : 'Clear'}
              </Badge>
            </div>
            <div className="space-y-3">
              {storageRows.map((row) => (
                <div key={row.source}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-[12.5px]">
                    <span className="text-ink-2">{sourceLabel(row.source)}</span>
                    <span className="tnum font-mono text-ink">{gb(row.bytes).toFixed(2)} GB</span>
                  </div>
                  <Meter value={(row.bytes / row.max) * 100} tone={row.source === 'resource' ? 'primary' : row.source === 'notebook' ? 'warning' : 'success'} />
                </div>
              ))}
              <p className="text-[11.5px] leading-relaxed text-ink-3">
                Counted once from managed student-owned stored assets, grouped by source. A dismissed threshold remains global until the next threshold is reached.
              </p>
              <p className="text-[11.5px] text-ink-3">
                Last acknowledgement: {report?.storage.acknowledgedThresholdGb ? `${report.storage.acknowledgedThresholdGb} GB` : 'none'}
                {report?.storage.acknowledgedAt && <> · {when(report.storage.acknowledgedAt)}</>}
                {report?.storage.acknowledgedBy && <> · admin {report.storage.acknowledgedBy}</>}
              </p>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Attention queue" icon={FileWarning} />
          <div className="grid gap-2 p-4">
            {[
              { label: 'Media-blocked content', value: report?.mediaBlockedContent, icon: ImageOff, tone: report?.mediaBlockedContent ? 'warning' : 'success' },
              { label: 'Open content reports', value: report?.reports.open, icon: Flag, tone: report?.reports.open ? 'warning' : 'success' },
              { label: 'Pending enrollment changes', value: report?.pendingEnrollmentChanges, icon: CalendarClock, tone: report?.pendingEnrollmentChanges ? 'warning' : 'success' },
              { label: 'Delivery problems', value: report?.notificationDelivery.problem30d, icon: BellRing, tone: report?.notificationDelivery.problem30d ? 'warning' : 'success' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2">
                <Icon icon={item.icon} size={16} className="text-ink-3" />
                <span className="min-w-0 flex-1 text-[13px] text-ink-2">{item.label}</span>
                <Badge tone={item.tone as 'warning' | 'success'}>{whole(item.value)}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="overflow-hidden">
        <PanelHeader title="Operational report detail" icon={Activity} hint={report ? `Generated ${when(report.generatedAt)}` : 'Loading…'} />
        <Table>
          <thead><tr><Th className="pl-4">Area</Th><Th>Signal</Th><Th align="end" className="pr-4">Value</Th></tr></thead>
          <tbody>
            {detailRows.map((row) => (
              <Tr key={`${row.area}-${row.signal}`}>
                <Td className="pl-4"><span className="inline-flex items-center gap-2 font-medium text-ink"><Icon icon={row.icon} size={15} className="text-ink-3" />{row.area}</span></Td>
                <Td className="text-ink-2">{row.signal}</Td>
                <Td align="end" className="tnum pr-4 font-mono text-ink">{row.value}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
