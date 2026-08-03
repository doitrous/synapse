import { useState } from 'react'
import { LifeBuoy, ShieldCheck, FileDown } from 'lucide-react'
import { tickets, dataRequests, consentSettings } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Toggle } from '@/components/ui/Toggle'
import { Table, Th, Td, Tr } from '@/components/ui/Table'

function priorityTone(p: string): 'danger' | 'warning' | 'neutral' {
  return p === 'High' ? 'danger' : p === 'Normal' ? 'warning' : 'neutral'
}

export function PrivacySupport() {
  const [consent, setConsent] = useState<Set<string>>(
    () => new Set(consentSettings.filter((c) => c.enabled).map((c) => c.id)),
  )
  function toggle(id: string) {
    setConsent((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const open = tickets.filter((t) => t.status !== 'Resolved').length

  return (
    <PageContainer>
      <PageHeader
        title="Privacy & Support"
        description="The student support queue, data requests, and consent settings."
      />

      <Panel className="mb-4">
        <PanelHeader
          title="Support queue"
          icon={LifeBuoy}
          action={<Badge tone="accent">{open} open</Badge>}
        />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Ticket</Th>
              <Th>Subject</Th>
              <Th>Student</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
              <Th align="right" className="pr-4">
                Age
              </Th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <Tr key={t.id} hover>
                <Td className="pl-4">
                  <span className="tnum font-mono text-[12.5px] text-ink-2">{t.id}</span>
                </Td>
                <Td className="font-medium">{t.subject}</Td>
                <Td>
                  <span className="tnum font-mono text-[12.5px] text-ink">{t.code}</span>
                </Td>
                <Td>
                  <Badge tone={priorityTone(t.priority)}>{t.priority}</Badge>
                </Td>
                <Td>
                  <StatusBadge status={t.status} />
                </Td>
                <Td align="right" className="tnum pr-4 font-mono text-[12.5px] text-ink-2">
                  {t.age}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Data requests" icon={FileDown} />
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Request</Th>
                <Th>Type</Th>
                <Th>Student</Th>
                <Th align="right" className="pr-4">
                  Status
                </Th>
              </tr>
            </thead>
            <tbody>
              {dataRequests.map((d) => (
                <Tr key={d.id} hover>
                  <Td className="pl-4">
                    <span className="tnum font-mono text-[12.5px] text-ink-2">{d.id}</span>
                  </Td>
                  <Td>
                    <Badge tone={d.type === 'Erasure' ? 'warning' : 'neutral'}>{d.type}</Badge>
                  </Td>
                  <Td>
                    <span className="tnum font-mono text-[12.5px] text-ink">{d.code}</span>
                  </Td>
                  <Td align="right" className="pr-4">
                    <StatusBadge status={d.status} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>

        <Panel>
          <PanelHeader title="Consent & data policy" icon={ShieldCheck} />
          <ul className="divide-y divide-line">
            {consentSettings.map((c) => (
              <li key={c.id} className="flex items-center gap-4 px-4 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-ink">{c.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-ink-2">{c.description}</p>
                </div>
                <Toggle checked={consent.has(c.id)} onChange={() => toggle(c.id)} label={c.name} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageContainer>
  )
}
