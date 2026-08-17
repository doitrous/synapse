import { useState } from 'react'
import { Building2, Users, Plug, Flag } from 'lucide-react'
import { institution, roles, integrations, featureFlags } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'
import { Field, TextInput } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'

export function Settings() {
  const [connected, setConnected] = useState<Set<string>>(
    () => new Set(integrations.filter((i) => i.connected).map((i) => i.name)),
  )
  const [flags, setFlags] = useState<Set<string>>(
    () => new Set(featureFlags.filter((f) => f.enabled).map((f) => f.id)),
  )
  const toggleIn = (name: string) =>
    setConnected((p) => {
      const n = new Set(p)
      if (n.has(name)) n.delete(name)
      else n.add(name)
      return n
    })
  const toggleFlag = (id: string) =>
    setFlags((p) => {
      const n = new Set(p)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  return (
    <PageContainer>
      <PageHeader title="Settings" description="Institution profile, roles, integrations, and feature flags." />

      <Panel className="mb-4">
        <PanelHeader title="Institution" icon={Building2} />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Institution name">
            <TextInput defaultValue={institution.name} />
          </Field>
          <Field label="Primary domain">
            <TextInput defaultValue={institution.domain} />
          </Field>
          <Field label="Region">
            <TextInput defaultValue={institution.region} />
          </Field>
          <Field label="Admin contact">
            <TextInput defaultValue={institution.contact} />
          </Field>
          <div className="sm:col-span-2">
            <Button variant="primary" size="md">
              Save changes
            </Button>
          </div>
        </div>
      </Panel>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            title="Roles & permissions"
            icon={Users}
            action={<Button variant="ghost" size="sm">Add role</Button>}
          />
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Role</Th>
                <Th align="end">Members</Th>
                <Th className="pr-4">Access</Th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <Tr key={r.name} hover>
                  <Td className="pl-4 font-medium">{r.name}</Td>
                  <Td align="end" className="tnum font-mono text-ink-2">
                    {r.members}
                  </Td>
                  <Td className="pr-4 text-[12.5px] text-ink-2">{r.description}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>

        <Panel>
          <PanelHeader title="Integrations" icon={Plug} />
          <ul className="divide-y divide-line">
            {integrations.map((i) => (
              <li key={i.name} className="flex items-center gap-4 px-4 py-3.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13.5px] font-medium text-ink">{i.name}</p>
                    {connected.has(i.name) && (
                      <Badge tone="success" dot>
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-ink-2">{i.description}</p>
                </div>
                <Toggle checked={connected.has(i.name)} onChange={() => toggleIn(i.name)} label={i.name} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <PanelHeader title="Feature flags" icon={Flag} />
        <ul className="divide-y divide-line">
          {featureFlags.map((f) => (
            <li key={f.id} className="flex items-center gap-4 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium text-ink">{f.name}</p>
                <p className="mt-0.5 text-[12.5px] text-ink-2">{f.description}</p>
              </div>
              <Toggle checked={flags.has(f.id)} onChange={() => toggleFlag(f.id)} label={f.name} />
            </li>
          ))}
        </ul>
      </Panel>
    </PageContainer>
  )
}
