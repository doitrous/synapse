import { useState } from 'react'
import { Building2, Users, Plug, Flag, IdCard } from 'lucide-react'
import { institution, roles, integrations, featureFlags } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'
import { Field, TextInput } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  DEFAULT_STUDENT_ID_DISCOUNT, STUDENT_ID_DISCOUNT_STORAGE_KEY, normaliseDiscountPercent,
  type StudentIdDiscount,
} from '@/data/studentDiscount'

export function Settings() {
  const [profile, setProfile] = useState(institution)
  const [notice, setNotice] = useState('')
  const [studentId, setStudentId] = usePersistentState<StudentIdDiscount>(STUDENT_ID_DISCOUNT_STORAGE_KEY, DEFAULT_STUDENT_ID_DISCOUNT)
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

      {notice && (
        <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint px-4 py-2.5 text-[13px] text-ink">
          <span className="flex-1">{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="text-[12px] font-medium text-ink-3 hover:text-ink">Dismiss</button>
        </div>
      )}

      <Panel className="mb-4">
        <PanelHeader title="Institution" icon={Building2} />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Institution name">
            <TextInput value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} />
          </Field>
          <Field label="Primary domain">
            <TextInput value={profile.domain} onChange={(event) => setProfile((current) => ({ ...current, domain: event.target.value }))} />
          </Field>
          <Field label="Region">
            <TextInput value={profile.region} onChange={(event) => setProfile((current) => ({ ...current, region: event.target.value }))} />
          </Field>
          <Field label="Admin contact">
            <TextInput value={profile.contact} onChange={(event) => setProfile((current) => ({ ...current, contact: event.target.value }))} />
          </Field>
          <div className="sm:col-span-2">
            <Button variant="primary" size="md" onClick={() => setNotice('Institution profile saved for this browser session.')}>
              Save changes
            </Button>
          </div>
        </div>
      </Panel>

      <Panel className="mb-4">
        <PanelHeader title="Student discounts" icon={IdCard} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 p-5">
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium text-ink">Student ID upload</p>
            <p className="mt-0.5 max-w-xl text-[12.5px] leading-relaxed text-ink-2">
              Offers students an upload on their Billing page to claim a discount. Never part of sign-up:
              asking someone for an identity document before they have seen the product is the wrong first
              request. While this is off, no student can tell the option exists.
            </p>
          </div>
          <Field label="Discount">
            <div className="flex items-center gap-1.5">
              <TextInput
                type="number"
                min={0}
                max={100}
                value={studentId.percent}
                onChange={(event) => setStudentId((current) => ({ ...current, percent: normaliseDiscountPercent(event.target.value) }))}
                aria-label="Student ID discount percent"
                className="tnum h-9 w-20 font-mono"
              />
              <span className="text-[12.5px] text-ink-3">%</span>
            </div>
          </Field>
          <label className="flex items-center gap-2 pt-5 text-[12.5px] text-ink-2">
            <Toggle
              checked={studentId.enabled}
              onChange={(enabled) => setStudentId((current) => ({ ...current, enabled }))}
              label="Offer the student ID discount"
            />
            {studentId.enabled ? 'Offered' : 'Not offered'}
          </label>
        </div>
      </Panel>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            title="Roles & permissions"
            icon={Users}
            action={<ButtonLink to="/admin/access" variant="ghost" size="sm">Manage access</ButtonLink>}
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
