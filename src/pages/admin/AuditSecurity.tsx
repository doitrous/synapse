import { Download, ShieldCheck, ScrollText, CircleCheck, TriangleAlert, CircleX } from 'lucide-react'
import { auditLog, securityChecks } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { DataBackupsPanel } from '@/components/admin/DataBackupsPanel'

const CHECK_ICON = {
  pass: { icon: CircleCheck, cls: 'text-success' },
  warn: { icon: TriangleAlert, cls: 'text-warning' },
  fail: { icon: CircleX, cls: 'text-danger' },
} as const

export function AuditSecurity() {
  const warnings = securityChecks.filter((c) => c.status !== 'pass').length

  return (
    <PageContainer>
      <PageHeader
        title="Audit & Security"
        description="Security posture and a full, immutable audit trail."
        actions={
          <Button variant="secondary" size="md" iconLeft={Download}>
            Export log
          </Button>
        }
      />

      <DataBackupsPanel />

      <Panel className="mb-4">
        <PanelHeader
          title="Security posture"
          icon={ShieldCheck}
          action={
            warnings === 0 ? (
              <Badge tone="success">All clear</Badge>
            ) : (
              <Badge tone="warning">{warnings} to review</Badge>
            )
          }
        />
        <ul className="divide-y divide-line">
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
              <Th align="right" className="pr-4">
                IP
              </Th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((e) => (
              <Tr key={e.id} hover>
                <Td className="tnum pl-4 font-mono text-[12.5px] text-ink-2">{e.time}</Td>
                <Td className="whitespace-nowrap font-medium">{e.actor}</Td>
                <Td className="whitespace-nowrap text-ink-2">{e.action}</Td>
                <Td className="text-ink-2">{e.target}</Td>
                <Td align="right" className="tnum whitespace-nowrap pr-4 font-mono text-[12px] text-ink-3">
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
