import { useState } from 'react'
import { Download, ShieldCheck, ScrollText, CircleCheck, TriangleAlert, CircleX, Database, RefreshCw } from 'lucide-react'
import { auditLog, securityChecks } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { DataBackupsPanel } from '@/components/admin/DataBackupsPanel'
import { API_MODE, apiGet } from '@/lib/api'

interface MedicalLibraryLaunchPreview {
  migrationId: string
  alreadyApplied: boolean
  appliedAt: string | null
  report: Record<string, number | boolean>
  statesToReplace: string[]
  existingStates: Array<{ k: string; sizeBytes: number; updatedAt: string }>
}

const CHECK_ICON = {
  pass: { icon: CircleCheck, cls: 'text-success' },
  warn: { icon: TriangleAlert, cls: 'text-warning' },
  fail: { icon: CircleX, cls: 'text-danger' },
} as const

export function AuditSecurity() {
  const warnings = securityChecks.filter((c) => c.status !== 'pass').length
  const [launchPreview, setLaunchPreview] = useState<MedicalLibraryLaunchPreview | null>(null)
  const [launchPreviewError, setLaunchPreviewError] = useState('')
  const [launchPreviewLoading, setLaunchPreviewLoading] = useState(false)

  async function loadMedicalLibraryPreview() {
    setLaunchPreviewLoading(true)
    setLaunchPreviewError('')
    try {
      setLaunchPreview(await apiGet<MedicalLibraryLaunchPreview>('/launch/medical-library-v1/preview'))
    } catch {
      setLaunchPreviewError('The production preflight could not be read. Confirm the admin session and try again.')
    } finally {
      setLaunchPreviewLoading(false)
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Audit & Security"
        description={API_MODE ? 'Production recovery points, launch preflight, and persisted audit events.' : 'Security posture and a full, immutable audit trail.'}
        actions={!API_MODE || auditLog.length ? (
          <Button variant="secondary" size="md" iconLeft={Download}>
            Export log
          </Button>
        ) : undefined}
      />

      <DataBackupsPanel />

      {API_MODE && (
        <Panel className="mb-4">
          <PanelHeader
            title="Medical library launch preflight"
            icon={Database}
            hint="Read-only · makes no database changes"
            action={
              <Button variant="secondary" size="sm" iconLeft={RefreshCw} loading={launchPreviewLoading} onClick={() => void loadMedicalLibraryPreview()}>
                {launchPreview ? 'Refresh preflight' : 'Run preflight'}
              </Button>
            }
          />
          <div className="p-4">
            {!launchPreview && !launchPreviewError && (
              <p className="text-[12.5px] leading-relaxed text-ink-2">Check the exact production state documents and launch-package totals before approving any replacement.</p>
            )}
            {launchPreviewError && <p role="alert" className="rounded-lg border border-danger/25 bg-danger-tint px-3 py-2 text-[12.5px] text-danger">{launchPreviewError}</p>}
            {launchPreview && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {['systems', 'topics', 'articles', 'concepts'].map((key) => (
                    <div key={key} className="rounded-lg border border-line bg-inset/40 px-3 py-2.5">
                      <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-3">{key}</p>
                      <p className="mt-1 font-mono text-[18px] font-semibold text-ink">{String(launchPreview.report[key] ?? 0)}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-line">
                  <div className="flex items-center justify-between border-b border-line px-3 py-2">
                    <p className="text-[12.5px] font-semibold text-ink">Existing live documents</p>
                    <Badge tone={launchPreview.existingStates.length ? 'warning' : 'success'}>{launchPreview.existingStates.length} found</Badge>
                  </div>
                  <ul className="divide-y divide-line">
                    {launchPreview.statesToReplace.map((key) => {
                      const existing = launchPreview.existingStates.find((entry) => entry.k === key)
                      return (
                        <li key={key} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5">
                          <code className="text-[11px] text-ink-2">{key}</code>
                          <span className="text-[11px] text-ink-3">{existing ? `${Math.ceil(existing.sizeBytes / 1024)} KB · would be replaced` : 'New document'}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <p className="text-[11.5px] text-ink-3">Migration {launchPreview.migrationId} · {launchPreview.alreadyApplied ? `already applied ${launchPreview.appliedAt ?? ''}` : 'not applied'}</p>
              </div>
            )}
          </div>
        </Panel>
      )}

      <Panel className="mb-4">
        <PanelHeader
          title="Security posture"
          icon={ShieldCheck}
          action={
            securityChecks.length === 0 ? (
              <Badge tone="neutral">Awaiting live checks</Badge>
            ) : warnings === 0 ? (
              <Badge tone="success">All clear</Badge>
            ) : (
              <Badge tone="warning">{warnings} to review</Badge>
            )
          }
        />
        <ul className="divide-y divide-line">
          {securityChecks.length === 0 && <li className="px-4 py-4 text-[12.5px] leading-relaxed text-ink-2">No synthetic security results are shown in production. Add a persisted check only after the live control has been measured.</li>}
          {securityChecks.map((c) => {
            const m = CHECK_ICON[c.status]
            return (
              <li key={c.name} className="flex items-center gap-3 px-4 py-3.5">
                <Icon icon={m.icon} size={18} className={m.cls} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-ink">{c.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-ink-2">{c.detail}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Panel>

      <Panel>
        <PanelHeader title="Audit trail" icon={ScrollText} hint="Today" />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Time</Th>
              <Th>Actor</Th>
              <Th>Action</Th>
              <Th>Target</Th>
              <Th align="end" className="pr-4">
                IP
              </Th>
            </tr>
          </thead>
          <tbody>
            {auditLog.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-[12.5px] text-ink-3">No persisted audit events have been recorded yet.</td></tr>
            )}
            {auditLog.map((e) => (
              <Tr key={e.id} hover>
                <Td className="tnum pl-4 font-mono text-[12.5px] text-ink-2">{e.time}</Td>
                <Td className="whitespace-nowrap font-medium">{e.actor}</Td>
                <Td className="whitespace-nowrap text-ink-2">{e.action}</Td>
                <Td className="text-ink-2">{e.target}</Td>
                <Td align="end" className="tnum whitespace-nowrap pr-4 font-mono text-[12px] text-ink-3">
                  {e.ip}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
