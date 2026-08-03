import { useState } from 'react'
import { CreditCard, Check, Download, BadgeCheck, TicketPercent, X } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { TextInput } from '@/components/ui/Field'
import { usePersistentState } from '@/lib/usePersistentState'
import { APPLIED_VOUCHER_STORAGE_KEY, initialVouchers, voucherDiscount, voucherEligibility, VOUCHER_STORAGE_KEY, type Voucher } from '@/data/vouchers'

const PLAN_FEATURES = [
  'Unlimited question bank',
  'Full library & resources',
  'Practical, OSCE & clinical cases',
  'Performance analytics',
  'Study Together sessions',
]

const INVOICES = [
  { id: 'INV-2026-08', date: '1 Aug 2026', desc: 'Osler Student — annual', amount: '£69.00', status: 'Paid' },
  { id: 'INV-2025-08', date: '1 Aug 2025', desc: 'Osler Student — annual', amount: '£59.00', status: 'Paid' },
  { id: 'INV-2024-08', date: '1 Aug 2024', desc: 'Osler Student — annual', amount: '£59.00', status: 'Paid' },
]

export function Billing() {
  const [vouchers, setVouchers] = usePersistentState<Voucher[]>(VOUCHER_STORAGE_KEY, initialVouchers)
  const [appliedVoucherId, setAppliedVoucherId] = usePersistentState<string | null>(APPLIED_VOUCHER_STORAGE_KEY, null)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const appliedVoucher = vouchers.find((voucher) => voucher.id === appliedVoucherId)
  const planPrice = 69
  const discount = appliedVoucher ? voucherDiscount(appliedVoucher, planPrice) : 0
  const renewalPrice = planPrice - discount

  function applyVoucher() {
    const voucher = vouchers.find((item) => item.code.toLowerCase() === code.trim().toLowerCase())
    if (!voucher) {
      setMessage('That voucher code was not found. Check the spelling and try again.')
      return
    }
    const error = voucherEligibility(voucher)
    if (error) {
      setMessage(error)
      return
    }
    if (appliedVoucherId !== voucher.id) {
      setVouchers((current) => current.map((item) => item.id === voucher.id ? { ...item, redemptionCount: item.redemptionCount + 1, updatedAt: new Date().toISOString() } : item))
    }
    setAppliedVoucherId(voucher.id)
    setCode('')
    setMessage(`${voucher.code} has been applied to your next renewal.`)
  }

  function removeVoucher() {
    if (appliedVoucher) setVouchers((current) => current.map((item) => item.id === appliedVoucher.id ? { ...item, redemptionCount: Math.max(0, item.redemptionCount - 1), updatedAt: new Date().toISOString() } : item))
    setAppliedVoucherId(null)
    setMessage('Voucher removed.')
  }

  return (
    <PageContainer>
      <PageHeader
        title="Billing"
        description="Your plan, payment method, and invoices."
      />

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelHeader
            title="Current plan"
            icon={BadgeCheck}
            action={<Badge tone="success">Active</Badge>}
          />
          <div className="p-5">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-[24px] font-semibold text-ink">Osler Student</span>
              <span className="tnum font-mono text-[15px] text-ink-2">£{renewalPrice.toFixed(2)}/year</span>
            </div>
            <p className="mt-1 text-[13px] text-ink-3">Renews on 1 August 2027 · student rate</p>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[13.5px] text-ink">
                  <span className="grid size-5 place-items-center rounded-full bg-accent-tint text-accent">
                    <Icon icon={Check} size={12} strokeWidth={2.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-2 border-t border-line pt-4">
              <Button variant="secondary" size="md">
                Change plan
              </Button>
              <Button variant="ghost" size="md">
                Cancel subscription
              </Button>
            </div>
          </div>
        </Panel>

        <Panel className="h-fit">
          <PanelHeader title="Payment method" icon={CreditCard} />
          <div className="p-5">
            <div className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 p-3">
              <span className="grid h-8 w-12 place-items-center rounded-md bg-ink text-[11px] font-semibold tracking-wide text-white">
                VISA
              </span>
              <div className="flex-1">
                <p className="tnum font-mono text-[13.5px] text-ink">•••• •••• •••• 4242</p>
                <p className="text-[12px] text-ink-3">Expires 08/28</p>
              </div>
            </div>
            <Button variant="secondary" size="md" className="mt-4 w-full">
              Update payment method
            </Button>
            <p className="mt-3 text-[12px] text-ink-3">
              Payments are handled securely by our provider. Card details are never stored by Osler.
            </p>
          </div>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Student voucher" icon={TicketPercent} action={appliedVoucher && <Badge tone="success">Applied</Badge>} />
        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:items-center">
          <div>
            <p className="text-[14px] font-semibold text-ink">Apply a discount to your next renewal</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-3">Voucher eligibility is checked against your university, year, group, dates, and the remaining redemption limit.</p>
          </div>
          {appliedVoucher ? <div className="flex items-center gap-3 rounded-lg border border-success/25 bg-success-tint p-3"><span className="min-w-0 flex-1"><strong className="block font-mono text-[13px] text-ink">{appliedVoucher.code}</strong><span className="mt-0.5 block text-[12px] text-ink-2">You save £{discount.toFixed(2)} · renewal £{renewalPrice.toFixed(2)}</span></span><IconButton icon={X} label="Remove voucher" size="sm" onClick={removeVoucher} /></div> : <div><div className="flex flex-col gap-2 sm:flex-row"><TextInput value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} onKeyDown={(event) => { if (event.key === 'Enter') applyVoucher() }} placeholder="Enter voucher code" aria-label="Voucher code" /><Button variant="primary" onClick={applyVoucher} disabled={!code.trim()}>Apply voucher</Button></div>{message && <p role="status" className="mt-2 text-[12px] text-ink-2">{message}</p>}</div>}
        </div>
      </Panel>

      <Panel className="mt-4">
        <PanelHeader title="Invoices" />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Invoice</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th align="right">Amount</Th>
              <Th align="center">Status</Th>
              <Th align="right" className="pr-4">
                Receipt
              </Th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <Tr key={inv.id} hover>
                <Td className="pl-4">
                  <span className="tnum font-mono text-[12.5px] text-ink-2">{inv.id}</span>
                </Td>
                <Td className="whitespace-nowrap text-[13px] text-ink-2">{inv.date}</Td>
                <Td className="text-[13px]">{inv.desc}</Td>
                <Td align="right" className="tnum font-mono text-[13px]">
                  {inv.amount}
                </Td>
                <Td align="center">
                  <Badge tone="success">{inv.status}</Badge>
                </Td>
                <Td align="right" className="pr-4">
                  <IconButton icon={Download} label="Download receipt" size="sm" />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
