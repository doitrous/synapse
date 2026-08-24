import { useEffect, useMemo, useState } from 'react'
import { Banknote, TrendingUp, Users, Repeat, CircleDollarSign, GraduationCap, CalendarRange, Plus, RefreshCw } from 'lucide-react'
import { finance, revenueByMonth, transactions } from '@/data/admin'
import { adminStudents } from '@/data/students'
import { YEARS } from '@/data/universities'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { monthlyPriceFor } from '@/data/planCatalog'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { PlanCatalogEditor } from '@/components/admin/PlanCatalogEditor'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Stat } from '@/components/ui/Stat'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { BarList } from '@/components/charts/BarList'
import { Meter } from '@/components/ui/Meter'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Badge } from '@/components/ui/Badge'
import { API_MODE, apiGet, apiPost } from '@/lib/api'

const egp = (n: number) => `EGP ${Math.round(n).toLocaleString()}`
const localDateTime = (daysFromNow: number) => new Date(Date.now() + daysFromNow * 86_400_000).toISOString().slice(0, 16)

interface PricingDiscount {
  id: string
  kind: 'promotion' | 'voucher'
  code: string | null
  label: string
  period: 'monthly' | 'term' | 'both'
  discountType: 'percent' | 'fixed'
  discountValue: number
  startsAt: string
  endsAt: string
  active: boolean
  maxRedemptions?: number | null
}

interface PricingState {
  plans: Array<{ period: 'monthly' | 'term'; label: string; currency: string; amount: number }>
  promotions: PricingDiscount[]
  vouchers: PricingDiscount[]
}

interface DiscountDraft {
  kind: 'promotion' | 'voucher'
  code: string
  label: string
  period: 'monthly' | 'term' | 'both'
  discountType: 'percent' | 'fixed'
  discountValue: number
  startsAt: string
  endsAt: string
}

const emptyDiscount = (kind: 'promotion' | 'voucher'): DiscountDraft => ({
  kind,
  code: '',
  label: kind === 'promotion' ? 'Timed campaign' : 'Voucher code',
  period: kind === 'voucher' ? 'monthly' : 'both',
  discountType: 'percent',
  discountValue: 10,
  startsAt: localDateTime(0),
  endsAt: localDateTime(14),
})

export function PaymentsFinance() {
  const [universities] = useUniversityCatalogue()
  const [catalog, setCatalog] = usePlanCatalog()
  const [pricing, setPricing] = useState<PricingState | null>(null)
  const [draft, setDraft] = useState<DiscountDraft>(() => emptyDiscount('promotion'))
  const [pricingBusy, setPricingBusy] = useState(false)
  const [pricingNotice, setPricingNotice] = useState('')

  async function loadPricing() {
    if (!API_MODE) return
    setPricingBusy(true)
    try {
      setPricing(await apiGet<PricingState>('/admin/pricing'))
      setPricingNotice('')
    } catch {
      setPricingNotice('Could not load live pricing.')
    } finally {
      setPricingBusy(false)
    }
  }

  useEffect(() => { void loadPricing() }, [])

  async function createDiscount() {
    if (!draft.label.trim()) {
      setPricingNotice('Give the discount a label.')
      return
    }
    if (draft.kind === 'voucher' && !draft.code.trim()) {
      setPricingNotice('Give the voucher a code.')
      return
    }
    setPricingBusy(true)
    try {
      const body = {
        code: draft.code,
        label: draft.label,
        period: draft.period,
        discountType: draft.discountType,
        discountValue: draft.discountValue,
        startsAt: new Date(draft.startsAt).toISOString(),
        endsAt: new Date(draft.endsAt).toISOString(),
        active: true,
      }
      await apiPost(`/admin/pricing/${draft.kind === 'voucher' ? 'vouchers' : 'promotions'}`, body)
      setDraft(emptyDiscount(draft.kind))
      setPricingNotice('Discount saved.')
      await loadPricing()
    } catch (error) {
      setPricingNotice(error instanceof Error ? error.message : 'The discount was refused.')
    } finally {
      setPricingBusy(false)
    }
  }

  const byUniversity = useMemo(() => universities.map((u) => {
    const students = adminStudents.filter((s) => s.universityId === u.id)
    const revenue = students.reduce((n, s) => n + monthlyPriceFor(catalog, s.plan), 0)
    return { id: u.id, short: u.short, name: u.name, students: students.length, revenue, arpu: students.length ? revenue / students.length : 0 }
  }).sort((a, b) => b.revenue - a.revenue), [catalog, universities])

  const byYear = useMemo(() => YEARS.map((y) => {
    const students = adminStudents.filter((s) => s.year === y)
    const revenue = students.reduce((n, s) => n + monthlyPriceFor(catalog, s.plan), 0)
    return { year: y, students: students.length, revenue, arpu: students.length ? revenue / students.length : 0 }
  }), [catalog])

  const totalRevenue = byUniversity.reduce((n, u) => n + u.revenue, 0)
  const maxUni = Math.max(1, ...byUniversity.map((u) => u.revenue))
  const maxYear = Math.max(1, ...byYear.map((y) => y.revenue))


  return (
    <PageContainer>
      <PageHeader title="Payments & Finance" description="Revenue and subscriptions, broken down by university and year — and the plan catalogue the landing page and Billing both read." />

      <Panel className="mb-4 overflow-hidden">
        <PanelHeader
          title="All-access pricing"
          hint={API_MODE ? 'Server-authoritative monthly/term pricing, promotions and vouchers' : 'Live backend required'}
          action={<Button size="sm" variant="ghost" iconLeft={RefreshCw} loading={pricingBusy} onClick={() => void loadPricing()}>Refresh</Button>}
        />
        <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {(pricing?.plans ?? [
                { period: 'monthly' as const, label: 'One month all-access', currency: 'EGP', amount: 400 },
                { period: 'term' as const, label: 'One term all-access', currency: 'EGP', amount: 1000 },
              ]).map((plan) => (
                <Panel key={plan.period} className="px-4 py-3">
                  <p className="text-[12px] text-ink-3">{plan.label}</p>
                  <p className="tnum mt-1 font-mono text-[24px] font-semibold text-ink">{plan.currency} {plan.amount.toLocaleString()}</p>
                  <Badge tone="success" className="mt-2">All access</Badge>
                </Panel>
              ))}
            </div>
            <Table>
              <thead><tr><Th>Discount</Th><Th>Period</Th><Th>Value</Th><Th>Window</Th><Th>Status</Th></tr></thead>
              <tbody>
                {[...(pricing?.promotions ?? []), ...(pricing?.vouchers ?? [])].map((discount) => (
                  <Tr key={`${discount.kind}-${discount.id}`}>
                    <Td>
                      <p className="font-medium text-ink">{discount.label}</p>
                      <p className="text-[11.5px] text-ink-3">{discount.kind === 'voucher' ? `Voucher · ${discount.code}` : 'Timed promotion'}</p>
                    </Td>
                    <Td className="capitalize text-ink-2">{discount.period}</Td>
                    <Td className="tnum font-mono text-ink-2">{discount.discountType === 'percent' ? `${discount.discountValue}%` : egp(discount.discountValue)}</Td>
                    <Td className="text-[12px] text-ink-3">{new Date(discount.startsAt).toLocaleDateString()} → {new Date(discount.endsAt).toLocaleDateString()}</Td>
                    <Td><Badge tone={discount.active ? 'success' : 'neutral'}>{discount.active ? 'Active' : 'Paused'}</Badge></Td>
                  </Tr>
                ))}
                {pricing && pricing.promotions.length + pricing.vouchers.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-[13px] text-ink-3">No promotions or vouchers yet.</td></tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="mb-3 text-[13px] font-bold text-ink">Create discount</p>
            <div className="grid gap-3">
              <Field label="Kind">
                <Select value={draft.kind} onChange={(event) => setDraft(emptyDiscount(event.target.value as 'promotion' | 'voucher'))}>
                  <option value="promotion">Timed promotion</option>
                  <option value="voucher">Voucher</option>
                </Select>
              </Field>
              {draft.kind === 'voucher' && (
                <Field label="Voucher code">
                  <TextInput value={draft.code} onChange={(event) => setDraft({ ...draft, code: event.target.value.toUpperCase() })} placeholder="WELCOME20" />
                </Field>
              )}
              <Field label="Label"><TextInput value={draft.label} onChange={(event) => setDraft({ ...draft, label: event.target.value })} /></Field>
              <Field label="Period">
                <Select value={draft.period} onChange={(event) => setDraft({ ...draft, period: event.target.value as DiscountDraft['period'] })}>
                  {draft.kind === 'promotion' && <option value="both">Both periods</option>}
                  <option value="monthly">Monthly</option>
                  <option value="term">Term</option>
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Type">
                  <Select value={draft.discountType} onChange={(event) => setDraft({ ...draft, discountType: event.target.value as DiscountDraft['discountType'] })}>
                    <option value="percent">Percent</option>
                    <option value="fixed">Fixed EGP</option>
                  </Select>
                </Field>
                <Field label="Value">
                  <TextInput type="number" min={1} value={draft.discountValue} onChange={(event) => setDraft({ ...draft, discountValue: Number(event.target.value) })} />
                </Field>
              </div>
              <Field label="Starts"><TextInput type="datetime-local" value={draft.startsAt} onChange={(event) => setDraft({ ...draft, startsAt: event.target.value })} /></Field>
              <Field label="Ends"><TextInput type="datetime-local" value={draft.endsAt} onChange={(event) => setDraft({ ...draft, endsAt: event.target.value })} /></Field>
              {pricingNotice && <p role="status" className="text-[12.5px] text-ink-2">{pricingNotice}</p>}
              <Button variant="primary" iconLeft={Plus} loading={pricingBusy} disabled={!API_MODE} onClick={() => void createDiscount()}>Save discount</Button>
            </div>
          </div>
        </div>
      </Panel>

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="MRR" value={`£${finance.mrr.toLocaleString()}`} delta="+3.3%" icon={Banknote} />
        <Stat label="ARR" value={`£${(finance.arr / 1000).toFixed(0)}k`} delta="+3.3%" icon={TrendingUp} />
        <Stat label="Active subs" value={finance.activeSubs.toLocaleString()} delta="+2%" icon={Users} />
        <Stat label="Churn" value={`${finance.churnPct}%`} sub="monthly" icon={Repeat} />
        <Stat label="ARPU" value={`£${finance.arpu.toFixed(2)}`} sub="per student" icon={CircleDollarSign} />
      </div>

      <Panel className="mb-4">
        <PanelHeader title="Revenue" hint="Last 6 months" />
        <div className="p-5">
          <BarList max={7500} data={revenueByMonth.map((m) => ({ key: m.month, label: m.month, value: m.revenue, valueLabel: `£${(m.revenue / 1000).toFixed(1)}k` }))} />
        </div>
      </Panel>

      {/* By-university and by-year revenue */}
      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Revenue by university" icon={GraduationCap} hint={`Monthly · ${egp(totalRevenue)} total`} />
          <div className="p-5"><BarList data={byUniversity.map((u) => ({ key: u.id, value: u.revenue, valueLabel: egp(u.revenue), label: <span className="inline-flex items-center gap-1.5">{u.short}</span> }))} /></div>
        </Panel>
        <Panel>
          <PanelHeader title="Revenue by year" icon={CalendarRange} hint="Monthly, across all universities" />
          <div className="p-5"><BarList data={byYear.map((y) => ({ key: y.year, value: y.revenue, valueLabel: egp(y.revenue), label: y.year }))} /></div>
        </Panel>
      </div>

      {/* Head-to-head comparisons */}
      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel className="overflow-hidden">
          <PanelHeader title="Universities head-to-head" hint="Revenue · students · ARPU" />
          <Table>
            <thead><tr><Th className="pl-4">University</Th><Th align="end">Students</Th><Th align="end">Revenue</Th><Th align="end">ARPU</Th><Th className="pr-4">Share</Th></tr></thead>
            <tbody>{byUniversity.map((u) => (
              <Tr key={u.id} hover>
                <Td className="pl-4 font-medium">{u.short}</Td>
                <Td align="end" className="tnum font-mono text-ink-2">{u.students}</Td>
                <Td align="end" className="tnum font-mono">{egp(u.revenue)}</Td>
                <Td align="end" className="tnum font-mono text-ink-2">{egp(u.arpu)}</Td>
                <Td className="pr-4"><Meter value={(u.revenue / maxUni) * 100} tone="primary" className="w-24" /></Td>
              </Tr>
            ))}</tbody>
          </Table>
        </Panel>
        <Panel className="overflow-hidden">
          <PanelHeader title="Years head-to-head" hint="Revenue · students · ARPU" />
          <Table>
            <thead><tr><Th className="pl-4">Year</Th><Th align="end">Students</Th><Th align="end">Revenue</Th><Th align="end">ARPU</Th><Th className="pr-4">Share</Th></tr></thead>
            <tbody>{byYear.map((y) => (
              <Tr key={y.year} hover>
                <Td className="pl-4 font-medium">{y.year}</Td>
                <Td align="end" className="tnum font-mono text-ink-2">{y.students}</Td>
                <Td align="end" className="tnum font-mono">{egp(y.revenue)}</Td>
                <Td align="end" className="tnum font-mono text-ink-2">{egp(y.arpu)}</Td>
                <Td className="pr-4"><Meter value={(y.revenue / maxYear) * 100} tone="success" className="w-24" /></Td>
              </Tr>
            ))}</tbody>
          </Table>
        </Panel>
      </div>

      <PlanCatalogEditor catalog={catalog} onChange={setCatalog} universities={universities} />

      <Panel>
        <PanelHeader title="Recent transactions" />
        <Table>
          <thead><tr><Th className="pl-4">Invoice</Th><Th>Student</Th><Th>Plan</Th><Th align="end">Amount</Th><Th>Status</Th><Th align="end" className="pr-4">Date</Th></tr></thead>
          <tbody>{transactions.map((t) => (
            <Tr key={t.id} hover>
              <Td className="pl-4"><span className="tnum font-mono text-[12.5px] text-ink-2">{t.id}</span></Td>
              <Td><span className="tnum font-mono text-[12.5px] text-ink">{t.code}</span></Td>
              <Td className="text-ink-2">{t.plan}</Td>
              <Td align="end" className="tnum font-mono">{t.amount}</Td>
              <Td><StatusBadge status={t.status} /></Td>
              <Td align="end" className="whitespace-nowrap pr-4 text-[12.5px] text-ink-2">{t.date}</Td>
            </Tr>
          ))}</tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
