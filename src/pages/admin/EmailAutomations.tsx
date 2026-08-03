import { useState } from 'react'
import { Plus, Mail, Zap } from 'lucide-react'
import { campaigns, automations } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Toggle } from '@/components/ui/Toggle'
import { Table, Th, Td, Tr } from '@/components/ui/Table'

export function EmailAutomations() {
  const [enabled, setEnabled] = useState<Set<string>>(
    () => new Set(automations.filter((a) => a.enabled).map((a) => a.id)),
  )
  function toggle(id: string) {
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <PageContainer>
      <PageHeader
        title="Email & Automations"
        description="Announcements to students and automated communications."
        actions={
          <Button variant="primary" size="md" iconLeft={Plus}>
            New campaign
          </Button>
        }
      />

      <Panel className="mb-4">
        <PanelHeader title="Campaigns" icon={Mail} />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Subject</Th>
              <Th>Status</Th>
              <Th align="right">Recipients</Th>
              <Th align="right">Open rate</Th>
              <Th align="right" className="pr-4">
                When
              </Th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <Tr key={c.id} hover>
                <Td className="pl-4 font-medium">{c.subject}</Td>
                <Td>
                  <StatusBadge status={c.status} />
                </Td>
                <Td align="right" className="tnum font-mono text-ink-2">
                  {c.recipients.toLocaleString()}
                </Td>
                <Td align="right" className="tnum font-mono text-ink-2">
                  {c.openRate > 0 ? `${c.openRate}%` : '—'}
                </Td>
                <Td align="right" className="whitespace-nowrap pr-4 text-[12.5px] text-ink-2">
                  {c.when}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>

      <Panel>
        <PanelHeader title="Automations" icon={Zap} />
        <ul className="divide-y divide-line">
          {automations.map((a) => (
            <li key={a.id} className="flex items-center gap-4 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium text-ink">{a.name}</p>
                <p className="mt-0.5 text-[12.5px] text-ink-2">{a.description}</p>
              </div>
              <span className="hidden rounded bg-inset px-2 py-1 text-[11.5px] text-ink-2 sm:inline">
                {a.trigger}
              </span>
              <Toggle checked={enabled.has(a.id)} onChange={() => toggle(a.id)} label={a.name} />
            </li>
          ))}
        </ul>
      </Panel>
    </PageContainer>
  )
}
