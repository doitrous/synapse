import { useMemo, useState } from 'react'
import { CircleCheck, Pencil, Plus, TicketPercent, Trash2, X } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { DateField } from '@/components/ui/DateTimeField'
import { IconButton } from '@/components/ui/IconButton'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import { formatLongDate } from '@/lib/format'
import { YEARS } from '@/data/universities'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { DEFAULT_TRIAL_DAYS, initialVouchers, isTrialVoucher, voucherTrialDays, VOUCHER_STORAGE_KEY, type Voucher, type VoucherDiscountType, type VoucherGrantKind } from '@/data/vouchers'

function dateInput(value: string) {
  return new Date(value).toISOString().slice(0, 10)
}

function emptyVoucher(): Voucher {
  const now = new Date()
  const end = new Date(now)
  end.setMonth(end.getMonth() + 1)
  return {
    id: `voucher-${Date.now()}`,
    code: '',
    name: '',
    discountType: 'Percentage',
    amount: 10,
    grant: 'Discount',
    trialDays: DEFAULT_TRIAL_DAYS,
    active: true,
    startsAt: now.toISOString(),
    expiresAt: end.toISOString(),
    maxRedemptions: 100,
    redemptionCount: 0,
    universityIds: [],
    years: [],
    groups: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

export function VoucherManagement() {
  const [universityCatalogue] = useUniversityCatalogue()
  const [vouchers, setVouchers] = usePersistentState<Voucher[]>(VOUCHER_STORAGE_KEY, initialVouchers)
  const [editing, setEditing] = useState<Voucher | null>(null)
  const [notice, setNotice] = useState('')
  const activeCount = useMemo(() => vouchers.filter((voucher) => voucher.active && new Date(voucher.expiresAt).getTime() >= Date.now()).length, [vouchers])

  function save() {
    if (!editing || !editing.code.trim() || !editing.name.trim()) return
    if (!isTrialVoucher(editing) && editing.amount <= 0) return
    if (isTrialVoucher(editing) && voucherTrialDays(editing) <= 0) return
    const next = { ...editing, code: editing.code.trim().toUpperCase().replace(/\s+/g, ''), name: editing.name.trim(), updatedAt: new Date().toISOString() }
    setVouchers((current) => current.some((voucher) => voucher.id === next.id) ? current.map((voucher) => voucher.id === next.id ? next : voucher) : [next, ...current])
    setEditing(null)
    setNotice(`Voucher ${next.code} saved.`)
  }

  function toggleList(field: 'universityIds' | 'years', value: string) {
    setEditing((current) => current ? { ...current, [field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value] } : current)
  }

  return (
    <PageContainer>
      <PageHeader title="Vouchers" description="Create discount codes, limit who can use them, and track redemption without exposing pricing controls to students." actions={<Button variant="primary" iconLeft={Plus} onClick={() => setEditing(emptyVoucher())}>New voucher</Button>} />
      {notice && <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint px-4 py-2.5 text-[13px] text-ink"><CircleCheck size={15} className="text-success" />{notice}<button className="ml-auto text-[12px] text-ink-3" onClick={() => setNotice('')}>Dismiss</button></div>}

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <Panel className="overflow-hidden">
          <PanelHeader title="Discount codes" icon={TicketPercent} hint={`${activeCount} active`} />
          <Table>
            <thead><tr><Th className="pl-4">Voucher</Th><Th>Discount</Th><Th>Audience</Th><Th>Redemptions</Th><Th>Expires</Th><Th>Status</Th><Th align="right" className="pr-4">Actions</Th></tr></thead>
            <tbody>
              {vouchers.map((voucher) => {
                const expired = new Date(voucher.expiresAt).getTime() < Date.now()
                const audience = voucher.universityIds.length + voucher.years.length + voucher.groups.length
                return <Tr key={voucher.id} hover><Td className="pl-4"><p className="font-mono text-[13px] font-bold text-ink">{voucher.code}</p><p className="mt-0.5 text-[11.5px] text-ink-3">{voucher.name}</p></Td><Td className="whitespace-nowrap font-mono text-[12.5px] text-ink-2">{isTrialVoucher(voucher) ? `${voucherTrialDays(voucher)}-day full access` : voucher.discountType === 'Percentage' ? `${voucher.amount}%` : `£${voucher.amount.toFixed(2)}`}</Td><Td className="text-[12px] text-ink-2">{audience ? `${audience} audience rules` : 'All students'}</Td><Td className="font-mono text-[12px] text-ink-2">{voucher.redemptionCount} / {voucher.maxRedemptions || '∞'}</Td><Td className="whitespace-nowrap text-[12px] text-ink-2">{formatLongDate(new Date(voucher.expiresAt))}</Td><Td><Badge tone={!voucher.active || expired ? 'neutral' : 'success'}>{expired ? 'Expired' : voucher.active ? 'Active' : 'Paused'}</Badge></Td><Td align="right" className="pr-4"><div className="inline-flex gap-1"><IconButton icon={Pencil} label={`Edit ${voucher.code}`} size="sm" onClick={() => setEditing({ ...voucher })} /><IconButton icon={Trash2} label={`Delete ${voucher.code}`} size="sm" className="text-danger" onClick={() => setVouchers((current) => current.filter((item) => item.id !== voucher.id))} /></div></Td></Tr>
              })}
            </tbody>
          </Table>
        </Panel>

        <Panel className="overflow-hidden xl:sticky xl:top-20">
          <PanelHeader title={editing ? (vouchers.some((voucher) => voucher.id === editing.id) ? 'Edit voucher' : 'New voucher') : 'Voucher details'} action={editing && <IconButton icon={X} label="Close voucher editor" size="sm" onClick={() => setEditing(null)} />} />
          {editing ? <div className="space-y-4 p-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"><Field label="Code" htmlFor="voucher-code"><TextInput id="voucher-code" value={editing.code} onChange={(event) => setEditing({ ...editing, code: event.target.value.toUpperCase() })} placeholder="WELCOME20" /></Field><Field label="Internal name" htmlFor="voucher-name"><TextInput id="voucher-name" value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} /></Field></div>
            <Field label="What redeeming gives" hint={isTrialVoucher(editing) ? 'Opens every plan feature for a fixed number of days, then ends. No money comes off the price.' : 'Takes money off the plan price.'}>
              <Select value={editing.grant ?? 'Discount'} onChange={(event) => setEditing({ ...editing, grant: event.target.value as VoucherGrantKind })}>
                <option>Discount</option>
                <option>Full-access trial</option>
              </Select>
            </Field>
            {isTrialVoucher(editing) ? (
              <Field label="Trial length (days)" hint={`The platform trial is ${DEFAULT_TRIAL_DAYS} days.`}><TextInput type="number" min="1" value={editing.trialDays ?? DEFAULT_TRIAL_DAYS} onChange={(event) => setEditing({ ...editing, trialDays: Number(event.target.value) })} /></Field>
            ) : (
              <div className="grid grid-cols-2 gap-3"><Field label="Discount type"><Select value={editing.discountType} onChange={(event) => setEditing({ ...editing, discountType: event.target.value as VoucherDiscountType })}><option>Percentage</option><option>Fixed amount</option></Select></Field><Field label={editing.discountType === 'Percentage' ? 'Percent off' : 'Amount off (£)'}><TextInput type="number" min="1" max={editing.discountType === 'Percentage' ? 100 : undefined} value={editing.amount} onChange={(event) => setEditing({ ...editing, amount: Number(event.target.value) })} /></Field></div>
            )}
            <div className="grid grid-cols-2 gap-3"><Field label="Starts"><DateField value={dateInput(editing.startsAt)} onChange={(next) => setEditing({ ...editing, startsAt: new Date(`${next}T00:00:00`).toISOString() })} /></Field><Field label="Expires"><DateField value={dateInput(editing.expiresAt)} min={dateInput(editing.startsAt)} onChange={(next) => setEditing({ ...editing, expiresAt: new Date(`${next}T23:59:59`).toISOString() })} /></Field></div>
            <Field label="Maximum redemptions" hint="Use 0 for no limit."><TextInput type="number" min="0" value={editing.maxRedemptions} onChange={(event) => setEditing({ ...editing, maxRedemptions: Number(event.target.value) })} /></Field>
            <fieldset><legend className="text-[12.5px] font-medium text-ink-2">Universities</legend><div className="mt-2 grid gap-2">{universityCatalogue.map((university) => <label key={university.id} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border border-line px-3 text-[12px] text-ink-2 transition-colors hover:bg-inset"><input type="checkbox" checked={editing.universityIds.includes(university.id)} onChange={() => toggleList('universityIds', university.id)} /><strong className="shrink-0 font-mono text-[11px] text-accent-strong">{university.short}</strong><span className="min-w-0 truncate">{university.name}</span></label>)}</div></fieldset>
            <fieldset><legend className="text-[12.5px] font-medium text-ink-2">Years</legend><div className="mt-2 flex flex-wrap gap-2">{YEARS.map((year) => <label key={year} className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-line px-2.5 text-[12px] text-ink-2"><input type="checkbox" checked={editing.years.includes(year)} onChange={() => toggleList('years', year)} />{year.replace('Year ', 'Y')}</label>)}</div></fieldset>
            <Field label="Groups" hint="Comma-separated. Leave blank for every group."><TextInput value={editing.groups.join(', ')} onChange={(event) => setEditing({ ...editing, groups: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} placeholder="Cardiovascular block, Cohort B" /></Field>
            <label className="flex min-h-11 items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 text-[13px] text-ink"><input type="checkbox" checked={editing.active} onChange={(event) => setEditing({ ...editing, active: event.target.checked })} /><span><strong className="font-semibold">Active</strong><span className="block text-[11.5px] text-ink-3">Students can apply this code while its dates and audience match.</span></span></label>
            <Button variant="primary" className="w-full" onClick={save} disabled={!editing.code.trim() || !editing.name.trim() || (!isTrialVoucher(editing) && editing.amount <= 0)}>Save voucher</Button>
          </div> : <div className="px-5 py-12 text-center"><TicketPercent className="mx-auto text-ink-3" size={24} /><p className="mt-2 text-[13px] font-semibold text-ink">Select a voucher to edit it</p><p className="mt-1 text-[12px] leading-relaxed text-ink-3">Changes affect student validation immediately.</p></div>}
        </Panel>
      </div>
    </PageContainer>
  )
}
